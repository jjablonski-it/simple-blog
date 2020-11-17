import { Button, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import {
  MeDocument,
  MeQuery,
  PostsDocument,
  ReguralUserFragment,
  useLoginMutation,
} from "../generated/graphql";
import useMyPostsQuery from "../hooks/useMyPostsQuery";

const Login = () => {
  const [login, { error }] = useLoginMutation();
  const { length } = useMyPostsQuery();
  const router = useRouter();
  const { next } = router.query;

  if (error) return <p>Error: {JSON.stringify(error)}:</p>;

  return (
    <Grid container justify="center">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          const res = await login({
            variables: { input: { username, password } },

            update: async (store, { data }) => {
              if (!data?.login?.error) {
                const me = data?.login?.user as ReguralUserFragment;

                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me,
                  },
                });
              }
            },
            refetchQueries: [
              { query: PostsDocument, variables: { limit: length } },
            ],
            awaitRefetchQueries: true,
          });

          const error = res.data?.login?.error;
          if (error) {
            setErrors({ [error.field]: error.message });
          } else {
            if (typeof next === "string") router.push(next);
            else router.push("/");
          }
        }}
      >
        {({ values }) => (
          <Form autoComplete="off" noValidate={true}>
            <h1>Login</h1>

            <InputField name="username" />
            <InputField name="password" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {/* <Typography>{JSON.stringify(data)}</Typography> */}
    </Grid>
  );
};

export default Login;
