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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}:</p>;

  return <div>{JSON.stringify(data)}</div>;
}
