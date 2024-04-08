import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from "./auth/skipAuth";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    if (req.user && req.user.id) {
      return this.authService.login(req.user);
    } else {
      return req.user;
    }
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
