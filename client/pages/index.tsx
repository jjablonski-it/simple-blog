import { gql, useQuery } from "@apollo/client";
import { MeDocument } from "../generated/graphql";
import { initializeApollo } from "../lib/apolloClient";

const Home = () => {
  const { data, loading, error } = useQuery(MeDocument);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}:</div>;

  return <div>{JSON.stringify(data)}</div>;
};

Home.getInitialProps = async (ctx) => {
  console.log(ctx);

  if (ctx.req) return {};
  const apolloClient = initializeApollo();

  console.log("aaaaaa");

  await apolloClient.query({ query: MeDocument });

  return {
    initialApolloProps: apolloClient.cache.extract(),
  };
};

export default Home;
