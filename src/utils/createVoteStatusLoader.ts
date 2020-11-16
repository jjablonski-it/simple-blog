import DataLoader from "dataloader";
import Updoot from "../entities/Upvote";

type Input = { userId: number; postId: number }[];

export default () =>
  new DataLoader<Input[0], number | null>(async (input) => {
    const upvotes = await Updoot.findByIds(input as Input);

    const res = input.map(
      ({ userId, postId }) =>
        upvotes.find(
          (upvote) => upvote.postId === postId && upvote.userId === userId
        )?.value || null
    );
    return res;
  });
