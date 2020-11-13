import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Updoot from "../../../components/Posts/Upvote";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import NextLink from "next/link";
import { Formik } from "formik";
import InputField from "../../../components/InputField";

export default function Post(): ReactElement {
  const router = useRouter();
  let postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = usePostQuery({
    variables: { id: postId },
    skip: postId < 0,
  });

  const [updatePost] = useUpdatePostMutation();

  const post = data?.post;

  if (!post)
    return (
      <motion.div layoutId={`${postId}`}>
        <CircularProgress />
      </motion.div>
    );

  return (
    <motion.div layoutId={`${postId}`}>
      <Card>
        <CardContent>
          <Formik
            initialValues={{ title: post.title, text: post.text }}
            onSubmit={(values) => {
              updatePost({ variables: { id: post.id, ...values } });
              router.push("/");
            }}
          >
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                {Object.keys(values).map((value) => (
                  <InputField name={value} value={values[value]} />
                ))}
                {/* <InputField name="title" value={values.title} />
                <InputField name="text" value={values.text} /> */}
                <Button type="submit" fullWidth>
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <NextLink href="/">
        <Button color="primary">Home</Button>
      </NextLink>
    </motion.div>
  );
}
