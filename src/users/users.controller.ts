import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  addGirl(@Body() body): any {
    console.log(body);
    return this.usersService.login(body.name, body.password);
  }
}
