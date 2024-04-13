import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findMenu(): Promise<Album[]> {
    return await this.albumRepository.find({
      select: ['id', 'title', 'icon'],
    });
  }

  async findOne(id: number) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`album with ID "${id}" not found`);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });

    const updateAlbum = this.albumRepository.merge(album, updateAlbumDto);

    return this.albumRepository.save(updateAlbum);
  }

  async remove(id: number) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`删除相册错误， id${id}`);
    }
  }
}
