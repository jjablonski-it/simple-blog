import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Post from "../entities/Post";

@Resolver()
export default class PostResolver {
  @Query(() => String!)
  test() {
    return "OK 👌";
  }

  @Query(() => [Post])
  async posts() {
    return await Post.find();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number) {
    return await Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post> {
    const post = new Post();
    post.title = title;
    await post.save();
    return post;
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
