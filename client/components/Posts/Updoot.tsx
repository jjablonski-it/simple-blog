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
    // update: (cache) => {
    //   const upvotedPost = cache.readFragment<RegularPostFragment>({
    //     fragment: RegularPostFragmentDoc,
    //     id: `Post:${post.id}`,
    //   });
    //   cache.modify({
    //     fields: {
    //       posts: (existingPaginatedPosts: PaginatedPosts, ...test) => {
    //         console.log("existingPaginatedPosts", existingPaginatedPosts);
    //         console.log("test", test);
    //         const exisitngPosts = existingPaginatedPosts.posts;
    //         const upvotedPost = cache.readFragment<RegularPostFragment>({
    //           fragment: RegularPostFragmentDoc,
    //           id: `Post:${post.id}`,
    //         });
    //         if (!upvotedPost) return existingPaginatedPosts;
    //         // return {
    //         //   ...existingPaginatedPosts,
    //         //   posts: {
    //         //     ...exisitngPosts,
    //         //     upvotedPost: { ...upvotePost, points: upvotedPost.points + 1 },
    //         //   },
    //         // };
    //         return exisitngPosts;
    //       },
    //     },
    //   });
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
