import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

const useIsAuth = () => {
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, loading]);

  return { data, loading, error };
};

export default useIsAuth;
