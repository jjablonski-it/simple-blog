import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import Post from "./Post";
import User from "./User";

@ObjectType()
@Entity()
export default class Updoot extends BaseEntity {
  @Field()
  @Column({ type: "smallint", default: 1 })
  value!: number;

  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @Field()
  @PrimaryColumn()
  postId!: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.upvotes, { onDelete: "CASCADE" })
  post: Post;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
