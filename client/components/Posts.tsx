import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { PostsQuery, usePostsQuery } from "../generated/graphql";

const limit = 5;

export default function Posts(): ReactElement {
  const { data, fetchMore } = usePostsQuery({
    variables: { limit },
  });

  const posts = data?.posts.posts;
  const hasMore = data?.posts.hasMore;

  const loadMore = async () => {
    if (!posts) return;

    const cursor = posts[posts.length - 1].id;
    console.log("length", posts.length);
    console.log("cursor", cursor);
    console.log("posts", posts);
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
      <Grid container spacing={1}>
        {posts?.map((post) => (
          <Grid item key={post.id}>
            <Card>
              <CardContent>
                <Typography>{post.title}</Typography>
                <Typography color="textSecondary">
                  {post.textSnippet}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {posts && hasMore && (
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={loadMore}>
            {/* {loading && <CircularProgress />} */}
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
