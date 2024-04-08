import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // 验证用户名和密码
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('未找到用户', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return user;
  }
}
