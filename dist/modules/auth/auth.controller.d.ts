import { AuthDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: AuthDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
    signUp(dto: SignUpDto): Promise<{
        succes: boolean;
        message: string;
        data: any;
    } | {
        succes: boolean;
        message: string;
        data?: undefined;
    }>;
}
