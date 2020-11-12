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

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() { req }: ContextType) {
    const { userId } = req.session;
    console.log("vote status, userId: ", userId);

    if (userId) {
      const updoot = await Updoot.findOne({ userId, postId: post.id });
      if (updoot) {
        return updoot.value;
      }
    }
    return null;
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
  ): Promise<Post> {
    if (value === 0) throw Error("Value 0 provided");
    const finalValue = value > 0 ? 1 : -1;

    const post = await Post.findOne(postId, { relations: ["creator"] });
    if (!post) throw Error("Post does not exist");

    const existingUpdoot = await Updoot.findOne({ postId, userId });

    if (existingUpdoot) {
      if (existingUpdoot.value === finalValue) {
        // Same vote
        await existingUpdoot.remove();
        post.points -= finalValue;
      } else {
        existingUpdoot.value = finalValue;
        post.points += finalValue * 2;
        await existingUpdoot.save();
      }
    } else {
      post.points += finalValue;

      await Updoot.insert({ value: finalValue, postId, userId });
    }
    await post.save();
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
      relations: ["creator"],
      take: realLimit,
      order: { createdAt: "DESC" },
      ...whereClause,
    });

    //TODO improve this shit

    const postsWithCreator = await Promise.all(
      posts.map(
        async (post): Promise<any> => {
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
  async post(@Arg("id", () => Int) id: number) {
    return await Post.findOne(id, { relations: ["creator"] });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { userId }: ContextType
  ): Promise<Post> {
    const post = await Post.create({
      ...input,
      creatorId: userId,
    }).save();

    console.log("post", post.id);

    return (await Post.findOne(post.id, { relations: ["creator"] })) as Post;
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

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { userId }: ContextType
  ) {
    const result = await Post.delete({ id, creatorId: userId });
    if (!result) return false;
    return true;
  }
}
