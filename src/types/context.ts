import { Request, Response } from "express";
import createUserLoader from "../utils/createUserLoader";
import createVoteStatusLoader from "../utils/createVoteStatusLoader";

export interface ContextType {
  req: Request & { session: Express.Session };
  res: Response;
  userId?: number;
  userLoader: ReturnType<typeof createUserLoader>;
  voteStatusLoader: ReturnType<typeof createVoteStatusLoader>;
}
