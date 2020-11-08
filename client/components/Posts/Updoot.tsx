import { IconButton, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { ReactElement } from "react";
import {
  PaginatedPosts,
  RegularPostFragment,
  RegularPostFragmentDoc,
  useUpvoteMutation,
} from "../../generated/graphql";

interface Props {
  post: RegularPostFragment;
}

function Updoot({ post }: Props): ReactElement {
  const [upvotePost, tit] = useUpvoteMutation({
    // update: (cache, { data }) => {
    //   const postFrag = cache.readFragment<RegularPostFragment>({
    //     fragment: RegularPostFragmentDoc,
    //     id: "Post:" + post.id,
    //   });
    //   if(!postFrag) return;
    // },
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
      >
        <ArrowDropDown />
      </IconButton>
    </>
  );
}

export default Updoot;
