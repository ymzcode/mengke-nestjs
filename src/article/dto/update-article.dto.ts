import { IsOptional, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Article title must not be empty.' })
  @IsString({ message: 'Article title must be a string.' })
  @MaxLength(250, {
    message: 'Article title must not be longer than 250 characters.',
  })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Article content must not be empty.' })
  @IsString({ message: 'Article content must be a string.' })
  content?: string;

  // 这里可以根据需要添加其他字段的验证规则
  // 比如分类、标签等
}
