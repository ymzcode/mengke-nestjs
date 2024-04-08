import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService: GirlService) {}
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
  @Post('/add')
  addGirl(@Body() body): any {
    return this.girlService.addGirl();
  }
  @Get('/getGirlById')
  getGirlById(@Query() query): any {
    const id: number = parseInt(query.id);
    return this.girlService.getGirlsById(id);
  }
  @Get('/findGirlById/:id')
  findGirlById(@Request() req): any {
    const id: number = parseInt(req.params.id);
    return this.girlService.getGirlsById(id);
  }
  @Get('/delete/:id')
  deleteGirl(@Param() params): any {
    const id: number = parseInt(params.id);
    return this.girlService.delGirl(id);
  }
  @Get('/corstest')
  corsTest(): object {
    return {
      message: '测试跨域请求成功',
    };
  }
}
