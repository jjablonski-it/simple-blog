import { ContextType } from "src/types/context";
import { MiddlewareFn } from "type-graphql";

const isAuth: MiddlewareFn<ContextType> = ({ context }, next) => {
  const userId = context.req.session.userId;
  if (!userId) throw Error("not authenticated");

  context.userId = userId;

  return next();
};

export default isAuth;
