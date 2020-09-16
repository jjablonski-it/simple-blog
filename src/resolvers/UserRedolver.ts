import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export default class UserResover {
  @Mutation(() => String)
  async register(@Arg("input") input: UsernamePasswordInput) {
    return "ok";
  }
}
