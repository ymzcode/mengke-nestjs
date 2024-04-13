import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];
}
