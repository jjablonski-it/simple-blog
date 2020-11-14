import { Request, Response } from "express";
import generateUserLoader from "../utils/generateUserLoader";

export interface ContextType {
  req: Request & { session: Express.Session };
  res: Response;
  userId?: number;
  userLoader: ReturnType<typeof generateUserLoader>;
}
