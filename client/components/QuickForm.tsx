import { DocumentNode, useMutation } from "@apollo/client";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import { NextRouter, useRouter } from "next/dist/client/router";
import InputField from "../components/InputField";

interface Error {
  field: string;
  message: string;
}

type Props = {
  name: string;
  fields: string[];
  mutation: DocumentNode;
  onSubmit: (data: any, router: NextRouter) => Error | void;
  onError?: (router: NextRouter) => void;
  formProps?: FormikConfig<FormikValues>;
};

export default function QuickForm({
  mutation,
  fields,
  onSubmit,
  formProps,
  name,
  onError,
}: Props) {
  const [mutate] = useMutation(mutation);
  const router = useRouter();

  const initialValues = fields.reduce((total, current) => {
    return { ...total, [current]: "" };
  }, {});

  return (
    <Formik
      {...formProps}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true);

        const { data } = await mutate({
          variables: { input: values },
        }).catch((e) => {
          onError && onError(router);
          throw e;
        });
        setSubmitting(false);
        resetForm();

        console.log("data", data);

        const error = onSubmit(data, router);
        if (error) setErrors({ [error.field]: error.message });
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <h1>{name}</h1>
          {fields.map((field, index) => (
            <InputField name={field} key={index} />
          ))}
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color={"primary"} />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
