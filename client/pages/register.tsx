import { Form, Formik } from "formik";
import { Button, Grid } from "@material-ui/core";
import InputField from "../components/InputField";

const Register = () => {
  return (
    <Grid container justify="center">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
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
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default Register;
