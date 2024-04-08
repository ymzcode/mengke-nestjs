import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

function MiddleWareAll(req: any, res: any, next: any) {
  // console.log('全局中间件');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  // 使用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 如果设置为true, 验证器会自动去除非白名单属性的值
      forbidNonWhitelisted: true, // 如果非白名单的值存在，请求将被拒绝并返回错误
      transform: true, // 自动将payload转换为DTO实例
    }),
  );
  app.use(MiddleWareAll);
  app.setGlobalPrefix('mengke');

  await app.listen(3000);
}

bootstrap();
