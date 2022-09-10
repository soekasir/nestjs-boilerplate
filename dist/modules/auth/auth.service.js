"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const hooks_1 = require("../../helpers/hooks");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(table, jwt, config) {
        this.table = table;
        this.jwt = jwt;
        this.config = config;
    }
    async signin(dto) {
        const user = await this.getUser({ email: dto.email, withPassword: true });
        if (!user) {
            throw new common_1.UnauthorizedException((0, hooks_1.useResponse)(false, 'Email not registered'), 'Email not registered');
        }
        const isCorrectPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException((0, hooks_1.useResponse)(false, 'Password incorrect'), 'Password incorrect');
        }
        const token = await this.jwtToken(user.id, user.email);
        delete user.password;
        return {
            user,
            token,
        };
    }
    async getUser({ email = undefined, id = undefined, withPassword = false, withHash = false, withProfile = true, }) {
        const where = {};
        if (email)
            where.email = email;
        if (id)
            where.id = id;
        const include = {};
        if (withProfile)
            include.profile = true;
        const user = await this.table.user.findFirst({
            where: where,
            include: include,
        });
        if (!user)
            return null;
        if (!withPassword)
            delete user.password;
        if (!withHash)
            delete user.hash;
        return user;
    }
    async signup(dto) {
        const hash_password = await (0, argon2_1.hash)(dto.password);
        const hash_validator = await this.getHashValidator();
        if (dto.password !== dto.repeat_password) {
            throw new common_1.ForbiddenException((0, hooks_1.useResponse)(false, "password didn't match"), "Password didn't match");
        }
        try {
            const auth = await this.table.user.create({
                data: {
                    password: hash_password,
                    email: dto.email,
                    hash: hash_validator,
                },
            });
            if (auth)
                this.createProfile(auth.id);
            delete auth.password;
            delete auth.hash;
            delete auth.isValidate;
            delete auth.role;
            return auth;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((0, hooks_1.useResponse)(false, 'error: email already registered'), 'error');
        }
    }
    async jwtToken(userId, email) {
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
    async createProfile(id) {
        try {
            const user = await this.table.profile.create({
                data: {
                    user_id: id,
                },
            });
            return user;
        }
        catch (error) { }
    }
    async getHashValidator() {
        const hash_validator = await (0, argon2_1.hash)(new Date().getTime().toString());
        return hash_validator;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map