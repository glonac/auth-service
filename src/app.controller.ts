import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { SingUpDto } from './dto/sing-up.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Get()
  getHello(): string {
    return 'Auth service';
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/sign-in')
  async signIn(@Body() body: LoginDto) {
    return this.authService.singIn(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async fetchUser(@Headers() headers: { authorization: string }) {
    return this.authService.fetchUser(headers.authorization);
  }

  @Post('auth/sing-up')
  async signUp(@Body() body: SingUpDto) {
    const { password } = body;
    return this.authService.singUp(password);
  }
}
