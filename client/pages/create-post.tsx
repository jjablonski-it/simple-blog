import { Container } from "@material-ui/core";
import { NextPage } from "next";
import QuickForm from "../components/QuickForm";
import { CreatePostDocument } from "../generated/graphql";
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
      />
    </Container>
  );
}
