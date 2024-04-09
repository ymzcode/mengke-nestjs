import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Article title must not be empty.' })
  @IsString({ message: 'Article title must be a string.' })
  @MaxLength(250, {
    message: 'Article title must not be longer than 250 characters.',
  })
  title: string;

  @IsNotEmpty({ message: 'Article content must not be empty.' })
  @IsString({ message: 'Article content must be a string.' })
  content: string;

  @IsOptional()
  @IsArray({ message: 'Images must be an array of strings' })
  @IsString({ each: true, message: 'Each image must be a string' })
  images?: string[];

  @IsNotEmpty({ message: 'Category must not be empty.' })
  @IsNumber({}, { message: 'Category must be a valid number.' })
  categoryId: number; // 使用 categoryId 引用 Category 实体
}
