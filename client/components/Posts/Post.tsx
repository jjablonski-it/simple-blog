import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import NextLink from "next/link";
import {
  RegularPostFragment,
  useDeleteMutation,
} from "../../generated/graphql";
import Updoot from "./Updoot";
import { Remove } from "@material-ui/icons";
import Posts from ".";

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
  // const [blured, setBlured] = useState(false);
  const [deletePost] = useDeleteMutation();

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
              <IconButton
                style={{ position: "absolute", right: 0 }}
                onClick={() =>
                  deletePost({
                    variables: { id: post.id },
                    update: (cache) => {
                      cache.modify({
                        fields: {
                          posts: (existing = {}, { readField }) => {
                            const posts = existing.posts.filter(
                              (p) => readField("id", p) !== post.id
                            );

                            const res = { ...existing, posts };
                            console.log(res);

                            return res;
                          },
                        },
                      });
                    },
                  })
                }
              >
                <Remove color="secondary" fontSize="small" />
              </IconButton>
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
