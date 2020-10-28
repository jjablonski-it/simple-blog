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
import { usePostsQuery } from "../generated/graphql";
import useIsAuth from "../hooks/useIsAuth";
import styles from "../styles/test.module.css";

const Home = () => {
  const { data, loading, error } = useIsAuth();

  if (loading) return <div>Loading...</div>;
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

// Home.getInitialProps = async (ctx) => {
//   console.log(ctx);

//   if (ctx.req) return {};
//   const apolloClient = initializeApollo();

//   console.log("aaaaaa");

//   await apolloClient.query({ query: MeDocument });

//   return {
//     initialApolloProps: apolloClient.cache.extract(),
//   };
// };

export default Home;
