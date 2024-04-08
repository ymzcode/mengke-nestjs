import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 自动生成的创建时间戳

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 自动生成的更新时间戳
}
