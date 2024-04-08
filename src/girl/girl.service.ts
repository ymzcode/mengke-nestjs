import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './entities/girl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GirlService {
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}
  getGirls() {
    return {
      code: 0,
      data: ['翠花', '小红', '大丫'],
      msg: '请求女孩列表成功',
    };
  }
  addGirl() {
    const girl = new Girl();
    girl.name = '小11巧';
    girl.age = 10;
    girl.skill = 'asdasdasdasds';
    return this.girl.save(girl);
  }
  delGirl(id: number) {
    return this.girl.delete(id);
  }
  getGirlsById(id: number) {
    let reJson: any = {};
    switch (id) {
      case 1:
        reJson = { id: 1, name: 'asd' };
        break;
      case 2:
        reJson = { id: 2, name: 'asd' };
        break;
    }
    return reJson;
  }
}
