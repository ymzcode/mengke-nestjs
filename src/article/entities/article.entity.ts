import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number; // 文章的唯一标识，自动生成的主键

  @Column({ length: 500 })
  title: string; // 文章标题

  @Column('text')
  content: string; // 文章内容

  @Column({ nullable: true })
  author?: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ type: 'varchar', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'varchar', name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn({ name: 'categoryId' }) // 确保实际的数据库列名是正确的
  category: Category; // 文章与类别的多对一关系

  // 需要有一个categoryId的字段与JoinColumn名字对应，确保可以直接更新
  @Column()
  categoryId: number;

  // 在保存到数据库前设置时间
  @BeforeInsert()
  setCreatedAt() {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
}
