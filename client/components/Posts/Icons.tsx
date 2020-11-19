import { IconButton } from "@material-ui/core";
import { Remove, Edit } from "@material-ui/icons";
import React, { ReactElement } from "react";
import NextLink from "next/link";

import {
  Post,
  RegularPostFragment,
  useDeleteMutation,
} from "../../generated/graphql";

interface Props {
  post: RegularPostFragment;
}

export default function Icons({ post }: Props): ReactElement {
  const [deletePost] = useDeleteMutation();

  return (
    <div>
      <IconButton
        size="small"
        style={{ position: "absolute", right: 0 }}
        onClick={() =>
          deletePost({
            variables: { id: post.id },
            update: (cache) => {
              cache.modify({
                fields: {
                  posts: (existing = {}, { readField }) => {
                    const posts = existing.posts.filter(
                      (p: Post) => readField("id", p) !== post.id
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
      <IconButton
        size="small"
        style={{ position: "absolute", right: 0, top: 30 }}
      >
        <NextLink href={`/post/edit/[id]`} as={`/post/edit/${post.id}`}>
          <Edit color="secondary" fontSize="small" />
        </NextLink>
      </IconButton>
    </div>
  );
}
