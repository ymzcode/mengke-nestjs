import {
  IsArray,
  IsNotEmpty,
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
}
