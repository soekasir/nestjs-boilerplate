import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignUpDto } from './auth.dto';
export declare class AuthService {
    private table;
    private jwt;
    private config;
    constructor(table: PrismaService, jwt: JwtService, config: ConfigService);
    signin(dto: AuthDto): Promise<{
        user: import(".prisma/client").User & {};
        token: string;
    }>;
    getUser({ email, id, withPassword, withHash, withProfile, }: {
        email?: any;
        id?: any;
        withPassword?: boolean;
        withHash?: boolean;
        withProfile?: boolean;
    }): Promise<import(".prisma/client").User & {}>;
    signup(dto: SignUpDto): Promise<import(".prisma/client").User>;
    private jwtToken;
    private createProfile;
    private getHashValidator;
}
