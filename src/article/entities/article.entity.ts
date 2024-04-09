import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

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

  @Column({ type: 'varchar', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'varchar', name: 'updated_at' })
  updatedAt: string;

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
