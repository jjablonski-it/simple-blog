import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { RegularPostFragment } from "../../generated/graphql";
import Updoot from "./Updoot";

interface Props {
  post: RegularPostFragment;
  prevCount: number;
  index: number;
}

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

function Post({ post, index, prevCount }: Props) {
  return (
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
      custom={index - prevCount}
      variants={variants}
      initial="init"
      animate="anim"
    >
      <Grid item xs>
        <Card>
          <CardContent>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item container direction="column" alignItems="center" xs>
                <Updoot post={post} />
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
  );
}

export default Post;
