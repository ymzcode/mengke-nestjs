import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
  ) {}
  login(username: string, password: string): any {
    return this.users.findOne({
      where: { username, password },
    });
  }
  async findOne(name: string): Promise<Users | undefined> {
    return this.users.findOne({ where: { username: name } });
  }
}
