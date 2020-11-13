import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React, { ReactElement } from "react";
import Updoot from "../../components/Posts/Upvote";
import usePostFromUrl from "../../hooks/usePostFromUrl";

export default function Post(): ReactElement {
  const { post } = usePostFromUrl();
  const postId = post?.id;

  if (!post)
    return (
      <motion.div layoutId={`${postId}`}>
        <CircularProgress />
      </motion.div>
    );

  return (
    <motion.div layoutId={`${postId}`}>
      <NextLink href="/">
        <Card>
          <CardContent>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item container direction="column" alignItems="center" xs>
                <Updoot post={post} />
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {post.title} <b>- {post.creator.username}</b>
                </Typography>
              </Grid>
              <Typography color="textSecondary">{post.text}</Typography>
            </Grid>
          </CardContent>
        </Card>
      </NextLink>
    </motion.div>
  );
}
