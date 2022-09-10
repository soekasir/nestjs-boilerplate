import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthIdentify {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthDto extends AuthIdentify {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  repeat_password: string;
}
