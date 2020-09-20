import { Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";

const Login = () => {
  const [login, { error, data }] = useLoginMutation();

  if (error) return <p>Error: {JSON.stringify(error)}:</p>;

  return (
    <Grid container justify="center">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          const res = await login({ variables: { username, password } });

          const error = res.data?.login?.error;
          if (error) {
            setErrors({ [error.field]: error.message });
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
