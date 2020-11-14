import DataLoader from "dataloader";
import User from "../entities/User";

export default () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    return userIds.map((userId) => users.find((u) => u.id == userId) as User);
  });
