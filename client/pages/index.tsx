import useIsAuth from "../hooks/useIsAuth";
import styles from "../styles/test.module.css";

const Home = () => {
  const { data, loading, error } = useIsAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}:</div>;

  return (
    <pre className={styles.testClass}>{JSON.stringify(data, null, 4)}</pre>
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
