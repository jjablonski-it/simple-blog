import { IconButton, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { ReactElement } from "react";
import {
  RegularPostFragment,
  useUpvoteMutation,
} from "../../generated/graphql";

interface Props {
  post: RegularPostFragment;
}

function Updoot({ post }: Props): ReactElement {
  const [upvotePost] = useUpvoteMutation();

  return (
    <>
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
    </>
  );
}

export default Updoot;
