import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

ObjectType();
@Entity()
export default class User {
  @Field()
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
