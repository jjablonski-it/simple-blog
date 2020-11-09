import { motion } from "framer-motion";
import Posts from "../components/Posts";
import useIsAuth from "../hooks/useIsAuth";
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

// export const getStaticProps = async (ctx) => {
//   // console.log(ctx);

//   // if (ctx.req) return {};
//   const apolloClient = initializeApollo();

//   // console.log("aaaaaa");

//   const res = await apolloClient.query({
//     query: PostsDocument,
//     variables: { limit: 10 },
//   });
//   // console.log((res.data as PostsQuery).posts);

//   return {
//     props: { initialApolloProps: apolloClient.cache.extract() },
//   };
// };

export default Home;
