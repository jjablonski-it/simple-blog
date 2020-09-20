import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

export default function Home() {
  const { data, loading, error } = useQuery(gql`
    {
      me {
        id
        username
      }
    }
  `);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}:</div>;

  return <div>{JSON.stringify(data)}</div>;
}
