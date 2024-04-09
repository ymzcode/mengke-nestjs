import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number; // 唯一标识，自动生成的主键

  @Column()
  name: string; // 类别名称

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[]; // 设置一对多关系，一种类别可以对应多篇文章
}
