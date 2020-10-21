import { Request, Response } from "express";

export interface ContextType {
  req: Request & { session: Express.Session };
  res: Response;
  userId?: number;
}
