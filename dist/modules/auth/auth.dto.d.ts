export declare class AuthIdentify {
    email: string;
}
export declare class AuthDto extends AuthIdentify {
    password: string;
}
export declare class SignUpDto extends AuthDto {
    repeat_password: string;
}
