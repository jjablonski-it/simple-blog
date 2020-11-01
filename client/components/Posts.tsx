import {
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { usePostsQuery } from "../generated/graphql";

const limit = 5;

export default function Posts(): ReactElement {
  const { data, loading, fetchMore } = usePostsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "cache-first",
    // pollInterval: 10,
  });

  const posts = data?.posts;

  const loadMore = async () => {
    if (!posts) return;
    const cursor = posts[posts?.length - 1].id;
    const res = await fetchMore({ variables: { limit, cursor } });
    console.log(res);
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
      {posts && (
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
