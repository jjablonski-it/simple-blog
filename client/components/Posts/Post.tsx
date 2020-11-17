import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";
import { RegularPostFragment, useMeQuery } from "../../generated/graphql";
import Icons from "./Icons";
import Updoot from "./Upvote";

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
  const { data } = useMeQuery();
  // const [blured, setBlured] = useState(false);

  return (
    <motion.div
      drag
      layout
      // onAnimationStart={() => setBlured(true)}
      // onLayoutAnimationComplete={() => setBlured(false)}
      key={post.id}
      style={{
        margin: "5px",
        cursor: "grab",
        flexGrow: 1,
        minWidth: "20%",
      }}
      custom={index - prevCount}
      variants={variants}
      initial="init"
      animate="anim"
      layoutId={`${post.id}`}
    >
      <Grid item xs>
        <Card>
          <CardContent>
            <Grid
              container
              wrap="nowrap"
              spacing={1}
              style={{ position: "relative" }}
            >
              {data?.me?.id === post.creator.id && <Icons post={post} />}
              <Grid item container direction="column" alignItems="center" xs>
                <Updoot post={post} />
              </Grid>
              <Grid item xs={10}>
                <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                  <Typography style={{ cursor: "pointer" }}>
                    {post.title} <b>- {post.creator.username}</b>
                  </Typography>
                </NextLink>

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
