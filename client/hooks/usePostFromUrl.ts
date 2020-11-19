import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";

const usePostFromUrl = () => {
  const router = useRouter();
  let postId =
    typeof router?.query?.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = usePostQuery({
    variables: { id: postId },
    skip: postId < 0,
  });
  const post = data?.post;

  return { data, loading, post };
};

export default usePostFromUrl;
