import { Request, Response } from "express";
import createUserLoader from "../utils/createUserLoader";
import createVoteStatusLoader from "../utils/createVoteStatusLoader";

interface Session {
  cookie: string;
  userId: number;
}

export interface ContextType {
  req: Request & {
    session: Session;
  };
  res: Response;
  userId?: number;
  userLoader: ReturnType<typeof createUserLoader>;
  voteStatusLoader: ReturnType<typeof createVoteStatusLoader>;
}
