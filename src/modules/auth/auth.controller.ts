import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { useResponse } from 'src/helpers/hooks';
import { AuthDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthDto) {
    const user = await this.authService.signin(dto);
    return useResponse(true, 'berhasil sign-in', user);
  }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    const auth = await this.authService.signup(dto);
    return useResponse(
      true,
      'berhasil sign-up, kami telah mengirimkan email untuk validasi akun',
      auth,
    );
  }
}
