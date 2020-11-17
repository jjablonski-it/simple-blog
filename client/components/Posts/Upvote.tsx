import { IconButton, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import {
  RegularPostFragment,
  useUpvoteMutation,
} from "../../generated/graphql";

interface Props {
  post: RegularPostFragment | any;
}

function Updoot({ post }: Props): ReactElement {
  const router = useRouter();
  const [upvotePost] = useUpvoteMutation({
    onError: (e) => {
      router.replace("/login?next=" + router.pathname);
    },
  });

  return (
    <>
      <IconButton
        size="small"
        onClick={() =>
          upvotePost({
            variables: { postId: post.id, value: 1 },
          })
        }
        color={post.voteStatus && post.voteStatus > 0 ? "secondary" : "default"}
      >
        <ArrowDropUp />
      </IconButton>
      <Typography color="secondary">{post.points}</Typography>
      <IconButton
        size="small"
        onClick={() =>
          upvotePost({
            variables: { postId: post.id, value: -1 },
          })
        }
        color={post.voteStatus && post.voteStatus < 0 ? "secondary" : "default"}
      >
        <ArrowDropDown />
      </IconButton>
    </>
  );
}

export default Updoot;
