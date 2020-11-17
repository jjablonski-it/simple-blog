import { QueryHookOptions } from "@apollo/client";
import { Exact, PostsQuery, usePostsQuery } from "../generated/graphql";

const limit = 20;

const useMyPostsQuery = (
  props?: QueryHookOptions<
    PostsQuery,
    Exact<{ limit: number; cursor?: number | null | undefined }>
  >
) => {
  const result = usePostsQuery({
    variables: { limit },
    fetchPolicy: "cache-first",
    ...props,
  });

  const { data } = result;

  const posts = data?.posts.posts || [];
  const length = posts?.length || 0;
  const cursor = (posts && posts[length - 1].id) || null;

  return { ...result, posts, length, cursor, limit };
};

export default useMyPostsQuery;
