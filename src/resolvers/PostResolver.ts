import { ContextType } from "src/types/context";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { LessThan } from "typeorm";
import Updoot from "../entities/Updoot";
import Post from "../entities/Post";
import User from "../entities/User";
import isAuth from "../middleware/isAuth";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class PostText {
  @Field()
  text: String;
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export default class PostResolver {
  @FieldResolver(() => PostText)
  textSnippet(@Root() post: Post) {
    const maxChars = 50;
    return {
      text: post.text.slice(0, maxChars),
      hasMore: post.text.length > maxChars,
    } as PostText;
  }

  @Query(() => String!)
  test() {
    return "OK 👌";
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async upvote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { userId }: ContextType
  ) {
    if (value === 0) throw Error("Value 0 provided");
    const finalValue = value > 0 ? 1 : -1;

    const post = await Post.findOne(postId);
    if (!post) throw Error("Post does not exist");

    const existingUpdoot = await Updoot.findOne({ postId, userId });

    if (existingUpdoot) {
      if (existingUpdoot?.value === finalValue) {
        // Nothing changed, same vote
      } else {
        existingUpdoot.value = finalValue;
        post.points += finalValue * 2;
        await existingUpdoot.save();
        await post.save();
      }
    } else {
      post!.points += finalValue;

      await Updoot.insert({ value: finalValue, postId, userId });
      await post!.save();
    }
    return post;
  }

  @Query(() => PaginatedPosts!)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit) + 1;
    const whereClause = cursor ? { where: { id: LessThan(cursor) } } : {};

    const posts = await Post.find({
      // join: {
      //   alias: "p",
      //   innerJoin: { u: "p.creator" },
      // },

      take: realLimit,
      order: { createdAt: "DESC" },
      ...whereClause,
    });

    //TODO improve this shit

    const postsWithCreator = await Promise.all(
      posts.map(
        async (post): Promise<Post> => {
          const user = await User.findOne({ id: post.creatorId });
          if (!user) return post;

          post.creator = user;
          return post;
        }
      )
    );

    return {
      posts: postsWithCreator.slice(0, realLimit - 1),
      hasMore: posts.length === realLimit,
    };
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
