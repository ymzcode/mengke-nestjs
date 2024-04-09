import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category must not be empty.' })
  @IsString({ message: 'Category must be a string.' })
  name: string;
}
