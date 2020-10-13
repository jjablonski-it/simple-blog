import { Form, Formik } from "formik";
import { Button, Grid } from "@material-ui/core";
import InputField from "../components/InputField";
import {
  MeDocument,
  MeQuery,
  ReguralUserFragment,
  useLoginMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";

const Login = ({ test }) => {
  const [login, { error, data }] = useLoginMutation();
  const router = useRouter();

  if (error) return <p>Error: {JSON.stringify(error)}:</p>;

  return (
    <Grid container justify="center">
      {test}
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          const res = await login({
            variables: { input: { username, password } },
            // refetchQueries: [{ query: MeDocument }],
            update: (store, { data }) => {
              // const me: any = store.readQuery<MeQuery>({
              //   query: MeDocument,
              // });
              if (!data?.login?.error) {
                const me = data?.login?.user as ReguralUserFragment;

                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me,
                  },
                });

                // store.writeFragment<ReguralUserFragment>({
                //   fragment: ReguralUserFragmentDoc,
                //   id: me.id.toString(),
                //   data: {
                //     ...me,
                //   },
                // });
              }
            },
          });

          const error = res.data?.login?.error;
          if (error) {
            setErrors({ [error.field]: error.message });
          } else {
            router.push("/");
          }
        }}
      >
        {({ values }) => (
          <Form autoComplete="off" noValidate={true}>
            <InputField name="username" />
            <InputField name="password" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <pre>{JSON.stringify(values)}</pre>
          </Form>
        )}
      </Formik>
      {/* <Typography>{JSON.stringify(data)}</Typography> */}
    </Grid>
  );
};

export default Login;
