import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    // 使用 DTO 数据创建一个新的文章实体实例
    const article = this.articleRepository.create(createArticleDto);

    // 保存文章实体到数据库
    await this.articleRepository.save(article);

    return article; // 返回新创建的文章实体
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['category'], // 添加这个配置来加载 'category' 关联
    });
    if (!article) {
      throw new NotFoundException(`article with ID "${id}" not found`);
    }
    return article;
  }

  async findArticlesByCategory(categoryId: number): Promise<Article[]> {
    // 我们将要查找的类别实体
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID "${categoryId}" not found`);
    }

    // 查找和这个类别相关联的所有文章
    return this.articleRepository.find({
      where: {
        category: category,
      },
      // 可选：如果你需要加载文章的其他关系，你可以在这里指定
      // relations: ['comments', 'tags', ...],
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    const updateArticle = this.articleRepository.merge(
      article,
      updateArticleDto,
    );
    return this.articleRepository.save(updateArticle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`删除文章错误， id${id}`);
    }
  }
}
