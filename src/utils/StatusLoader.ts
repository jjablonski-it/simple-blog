import DataLoader from "dataloader";
import Updoot from "src/entities/Upvote";

type Input = [{ postId: number; userId: number }];

export const createStatusLoader = () =>
  new DataLoader<Input, Updoot>(async (data) => {
    const updoots = await Updoot.find(data as any);
    //TODO
    return updoots;
  });
