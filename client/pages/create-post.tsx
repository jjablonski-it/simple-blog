import { Container } from "@material-ui/core";
import { NextPage } from "next";
import QuickForm from "../components/QuickForm";
import {
  CreatePostDocument,
  PaginatedPosts,
  PostsDocument,
  PostsQuery,
  RegularPostFragment,
  RegularPostFragmentDoc,
  ReguralUserFragment,
  ReguralUserFragmentDoc,
} from "../generated/graphql";
import useIsAuth from "../hooks/useIsAuth";

interface Props {}

export default function CreatePost({}: Props) {
  useIsAuth();

  return (
    <Container>
      <QuickForm
        fields={["title", "text"]}
        name="Create post"
        onSubmit={(data, router) => {
          console.log("Create post");
          const error = data.createPost.error;
          if (error) router.push("/login");

          return error;
        }}
        mutation={CreatePostDocument}
        onError={(router) => {
          router.push("/login");
        }}
        // refetchQueries={[{ query: PostsDocument, variables: { limit: 10 } }]}
        handleUpdate={(cache, { data, errors, context }, mutate) => {
          console.log("errors", errors);
          console.log("context", context);
          console.log("data", data);

          if (!data) return;

          cache.modify({
            fields: {
              posts: (existingPaginatedPosts: PaginatedPosts) => {
                const existingPosts = existingPaginatedPosts.posts;

                const newPostRef = cache.writeFragment<RegularPostFragment>({
                  data: data.createPost,
                  fragment: ReguralUserFragmentDoc,
                });

                // console.log("ref", newPostRef);
                // console.log("existingPostsRefs", existingPosts);

                return {
                  ...existingPaginatedPosts,
                  posts: [newPostRef, ...existingPosts],
                };
              },
            },
          });
        }}
      />
    </Container>
  );
}
