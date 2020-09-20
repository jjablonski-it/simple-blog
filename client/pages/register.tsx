import { Form, Formik } from "formik";
import { Button, Grid } from "@material-ui/core";
import InputField from "../components/InputField";
import { gql } from "@apollo/client";
import { useRegisterMutation } from "../generated/graphql";

const Register = () => {
  // const [register, { loading, error }] = useMutation(registerMutation);
  const [register, { loading, error, data }] = useRegisterMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}:</p>;

  return (
    <Grid container justify="center">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          const res = await register({ variables: { username, password } });

          const error = res.data?.register.error;
          if (error) {
            setErrors({ [error.field]: error.message });
          }
        }}
      >
        {({ values }) => (
          <Form>
            <InputField name="username" />
            <InputField name="password" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <pre>{JSON.stringify(values)}</pre>
            <pre>{JSON.stringify(data?.register.user?.username)}</pre>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default Register;