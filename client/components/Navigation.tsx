import React from "react";
import { Box, Button, Grid, Link } from "@material-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface Props {}

const Navigation = (props: Props) => {
  const { data, loading } = useMeQuery();

  let body: any = null;

  if (loading) {
    body = <div>Loading</div>;
  } else if (!data?.me) {
    body = (
      <>
        <Grid item>
          <NextLink href="/">
            <Link variant="h5">Main</Link>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/login">
            <Link variant="h5">Login</Link>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href="/register">
            <Link variant="h5">Register</Link>
          </NextLink>
        </Grid>
      </>
    );
  } else {
    body = (
      <>
        <Grid item>{data.me.username}</Grid>
        <Grid item>
          <Button variant="text">Logout</Button>
        </Grid>
      </>
    );
  }

  return (
    <Box p={3} bgcolor="#a1a1a1">
      <Grid container spacing={2} justify="flex-end" alignItems="center">
        {body}
      </Grid>
    </Box>
  );
};

export default Navigation;
