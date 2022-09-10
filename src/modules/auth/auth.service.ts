import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { useResponse } from 'src/helpers/hooks';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private table: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.getUser({ email: dto.email, withPassword: true });

    if (!user) {
      throw new UnauthorizedException(
        useResponse(false, 'Email not registered'),
        'Email not registered',
      );
    }
    const isCorrectPassword = await verify(user.password, dto.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        useResponse(false, 'Password incorrect'),
        'Password incorrect',
      );
    }

    const token = await this.jwtToken(user.id, user.email);

    //delete password
    delete user.password;

    return {
      user,
      token,
    };
  }

  async getUser({
    email = undefined,
    id = undefined,
    withPassword = false,
    withHash = false,
    withProfile = true,
  }) {
    //setup where clause
    const where: any = {};
    if (email) where.email = email;
    if (id) where.id = id;

    //setup related data
    const include: any = {};
    if (withProfile) include.profile = true;

    //findFirst
    const user = await this.table.user.findFirst({
      where: where,
      include: include,
    });

    if (!user) return null;

    //excluding
    if (!withPassword) delete user.password;
    if (!withHash) delete user.hash;

    return user;
  }

  async signup(dto: SignUpDto) {
    const hash_password = await hash(dto.password);
    const hash_validator = await this.getHashValidator();

    if (dto.password !== dto.repeat_password) {
      throw new ForbiddenException(
        useResponse(false, "password didn't match"),
        "Password didn't match",
      );
    }

    try {
      const auth = await this.table.user.create({
        data: {
          password: hash_password,
          email: dto.email,
          hash: hash_validator,
        },
      });
      if (auth) this.createProfile(auth.id);
      delete auth.password;
      delete auth.hash;
      delete auth.isValidate;
      delete auth.role;
      return auth;
    } catch (error) {
      throw new InternalServerErrorException(
        useResponse(false, 'error: email already registered'),
        'error',
      );
    }
  }

  private async jwtToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2 days',
      secret: this.config.get('JWT_SECRET'),
    });

    return token;
  }

  private async createProfile(id: string) {
    try {
      const user = await this.table.profile.create({
        data: {
          user_id: id,
        },
      });
      return user;
    } catch (error) {}
  }

  private async getHashValidator() {
    const hash_validator = await hash(new Date().getTime().toString());
    return hash_validator;
  }
}
