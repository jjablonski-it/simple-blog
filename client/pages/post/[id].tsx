import { CircularProgress, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { usePostQuery } from "../../generated/graphql";

export default function Post(): ReactElement {
  const router = useRouter();
  let postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({
    variables: { id: postId },
    skip: postId < 0,
  });
  return (
    <div>
      {loading && <CircularProgress />}
      <Typography variant="h1">{data?.post?.title}</Typography>
      <Typography variant="body1">{data?.post?.text}</Typography>
    </div>
  );
}
