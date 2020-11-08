import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import Posts from "../components/Posts";
import { PostsDocument, PostsQuery, usePostsQuery } from "../generated/graphql";
import useIsAuth from "../hooks/useIsAuth";
import { initializeApollo } from "../lib/apolloClient";
import styles from "../styles/test.module.css";

const Home = () => {
  const { data, error } = useIsAuth();

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}:</div>;

  return (
    <>
      <motion.div
        style={{ position: "fixed", x: "-100%" }}
        animate={{
          rotate: -15,
          // transition: { duration: 1 },
        }}
      >
        <pre className={styles.testClass}>{JSON.stringify(data, null, 4)}</pre>
      </motion.div>
      <Posts />
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  // console.log(ctx);

  // if (ctx.req) return {};
  const apolloClient = initializeApollo();

  // console.log("aaaaaa");

  const res = await apolloClient.query({
    query: PostsDocument,
    variables: { limit: 10 },
  });
  // console.log((res.data as PostsQuery).posts);

  return {
    initialApolloProps: apolloClient.cache.extract(),
  };
};

export default Home;
