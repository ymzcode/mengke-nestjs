import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];
}
