import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import { usePostsQuery, useUpvoteMutation } from "../generated/graphql";

const limit = 3;
let prevCount = 0;

export default function Posts(): ReactElement {
  const { data, fetchMore, loading } = usePostsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const [upvotePost] = useUpvoteMutation();

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

  const variants = {
    init: { opacity: 0, y: -50 },
    anim: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + custom * 0.05,
      },
    }),
  };

  return (
    <Box mt={3}>
      <Grid container spacing={1} justify="center">
        {posts?.map((post, i) => (
          <motion.div
            drag
            layout
            onDrag={(e) => console.log(e.target)}
            key={post.id}
            style={{
              margin: "5px",
              cursor: "grab",
              flexGrow: 1,
              minWidth: "15%",
            }}
            custom={i - prevCount}
            variants={variants}
            initial="init"
            animate="anim"
          >
            <Grid item xs>
              <Card>
                <CardContent>
                  <Grid container wrap="nowrap" spacing={1}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          upvotePost({
                            variables: { postId: post.id, value: 1 },
                          })
                        }
                      >
                        <ArrowDropUp />
                      </IconButton>
                      <Typography color="secondary">{post.points}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          upvotePost({
                            variables: { postId: post.id, value: -1 },
                            // optimisticResponse: (cache, { postId }) => {},
                          })
                        }
                      >
                        <ArrowDropDown />
                      </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>{post.title}</Typography>
                      <Typography color="textSecondary">
                        {post.textSnippet.text}
                        {post.textSnippet.hasMore && "..."}
                      </Typography>
                    </Grid>
                  </Grid>
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
