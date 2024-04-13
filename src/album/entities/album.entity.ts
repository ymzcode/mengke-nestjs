import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // 相册名称

  @Column({ type: 'varchar', nullable: true })
  icon: string; // 相册图标

  @Column({ type: 'json', nullable: true })
  photos: string[]; // 假设照片的 URL 存储在字符串数组中

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
