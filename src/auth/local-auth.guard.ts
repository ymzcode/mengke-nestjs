import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new HttpException(
        '用户验证失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return user;
    }
  }
}
