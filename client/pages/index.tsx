import { motion } from "framer-motion";
import Posts from "../components/Posts";
import { PostsDocument, useMeQuery } from "../generated/graphql";
import { initializeApollo } from "../lib/apolloClient";
import styles from "../styles/test.module.css";

const Home = () => {
  const { data } = useMeQuery();

  return (
    <>
      <motion.div
        style={{ position: "fixed", x: "-100%" }}
        animate={{
          rotate: -15,
        }}
      >
        <pre className={styles.testClass}>{JSON.stringify(data, null, 4)}</pre>
      </motion.div>
      <Posts />
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  if (!ctx.req) return {};
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: { limit: 20 },
    context: {
      headers: {
        cookie: ctx.req.headers.cookie,
      },
    },
  });

  return {
    initialApolloProps: apolloClient.cache.extract(),
  };
};

export default Home;
