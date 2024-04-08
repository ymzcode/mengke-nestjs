import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Girl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  skill: string;

  @CreateDateColumn()
  entryTime: Date;

  @Generated('uuid')
  uuid: string;
}
