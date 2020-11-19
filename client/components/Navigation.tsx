import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import React from "react";
import {
  MeDocument,
  MeQuery,
  PostsDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import useMyPostsQuery from "../hooks/useMyPostsQuery";

const Navigation = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const { length } = useMyPostsQuery();

  let body = <></>;

  if (loading) {
    body = <>Loading...</>;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Button>Main</Button>
        </NextLink>
        <NextLink href="/login">
          <Button>Login</Button>
        </NextLink>
        <NextLink href="/register">
          <Button>Register</Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/">
          <Button>{data.me.username}</Button>
        </NextLink>
        <NextLink href="/create-post">
          <Button>Create post</Button>
        </NextLink>
        <Button
          variant="text"
          onClick={async () => {
            await logout({
              update: (store) => {
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: null,
                  },
                });
              },
              refetchQueries: [
                { query: PostsDocument, variables: { limit: length } },
              ],
              awaitRefetchQueries: true,
            });
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <AppBar color="primary" position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h5">Logo</Typography>
        <Grid container spacing={1} justify="flex-end" alignItems="center">
          {body}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
