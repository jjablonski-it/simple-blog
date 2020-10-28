import { ContextType } from "src/types/context";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { LessThan } from "typeorm";
import Post from "../entities/Post";
import isAuth from "../middleware/isAuth";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver(Post)
export default class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 10);
  }

  @Query(() => String!)
  test() {
    return "OK 👌";
  }

  @Query(() => [Post])
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ) {
    const realLimit = Math.min(50, limit);
    const whereClause = cursor ? { where: { id: LessThan(cursor) } } : {};
    return await Post.find({
      order: { createdAt: "DESC" },
      take: realLimit,
      ...whereClause,
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number) {
    return await Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { userId }: ContextType
  ): Promise<Post> {
    return await Post.create({
      ...input,
      creatorId: userId,
    }).save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("title") title: string,
    @Arg("id") id: number
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) return null;
    post.title = title;
    post.save();
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number) {
    const result = await Post.delete(id);
    if (!result) return false;
    return true;
  }
}
