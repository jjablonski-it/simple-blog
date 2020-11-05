import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import { usePostsQuery } from "../generated/graphql";

const limit = 20;
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

  const variants = {
    init: { opacity: 0, y: -50 },
    anim: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.05,
        // staggerChildren: 0.5,
      },
    }),
  };

  return (
    <Box mt={3}>
      <Grid container spacing={1}>
        {posts?.map((post, i) => (
          <motion.div
            key={post.id}
            drag
            style={{ margin: "5px", cursor: "grab" }}
            custom={i - prevCount}
            variants={variants}
            initial="init"
            animate="anim"
          >
            <Grid item>
              <Card>
                <CardContent>
                  <Typography>{post.title}</Typography>
                  <Typography color="textSecondary">
                    {post.textSnippet.text}
                    {post.textSnippet.hasMore && "..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </motion.div>
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
