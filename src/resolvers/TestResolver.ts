import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Cat } from "../entities/Cat";

@Resolver()
export default class TestResolver {
  @Query(() => String!)
  test() {
    return "OK 👌";
  }

  @Query(() => [Cat])
  async cats() {
    return await Cat.find();
  }

  @Mutation(() => Boolean)
  async createCat(@Arg("name") name: string, @Arg("lifes") lifes: number) {
    await Cat.insert({ name, lifes });
    return true;
  }
}
