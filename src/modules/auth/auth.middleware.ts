import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const headers: IncomingHttpHeaders = req.headers;
      const authorization: string = headers.authorization;
      const bearerToken: string[] = authorization.split(' ');
      const token: string = bearerToken[1];

      const payload = await this.jwt.verifyAsync(token, {
        ignoreExpiration: false,
        secret: this.config.get('JWT_SECRET'),
      });
      const activeUser = await this.authService.activeUser({
        id: payload.userId,
      });
      if (!activeUser) {
        throw new UnauthorizedException();
      }
      req.user = activeUser;
      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
