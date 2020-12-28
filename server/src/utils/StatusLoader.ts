import DataLoader from "dataloader";
import Upvote from "src/entities/Upvote";

type Input = [{ postId: number; userId: number }];

export const createStatusLoader = () =>
  new DataLoader<Input, Upvote>(async (data) => {
    const upvotes = await Upvote.find(data as any);
    //TODO
    return upvotes;
  });
