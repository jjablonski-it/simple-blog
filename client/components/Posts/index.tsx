import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import React, { ReactElement } from "react";
import { usePostsQuery } from "../../generated/graphql";
import Post from "./Post";

const limit = 3;
let prevCount = 0;

export default function Posts(): ReactElement {
  const { data, fetchMore, loading } = usePostsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const posts = data?.posts.posts;
  const hasMore = data?.posts.hasMore;

  const loadMore = async () => {
    console.log(prevCount);

    prevCount = posts?.length || 0;
    if (!posts) return;

    const cursor = posts[posts.length - 1].id;
    await fetchMore({
      variables: { limit, cursor },
      updateQuery: (previousValue, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousValue;

        return {
          __typename: "Query",
          posts: {
            __typename: "PaginatedPosts",
            posts: [
              ...previousValue.posts.posts,
              ...fetchMoreResult.posts.posts,
            ],
            hasMore: fetchMoreResult.posts.hasMore,
          },
        };
      },
    });
  };

  return (
    <Box mt={3}>
      <Grid container spacing={1} justify="center">
        {posts?.map((post, i) => (
          <Post key={i} post={post} index={i} prevCount={prevCount} />
        ))}
      </Grid>
      {posts && hasMore && (
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={loadMore}>
            {loading && <CircularProgress />}
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
