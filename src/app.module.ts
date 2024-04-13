import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    GirlModule,
    UsersModule,
    AuthModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test_db',
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载，
      timezone: '-08:00',
    }),
    CategoryModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
