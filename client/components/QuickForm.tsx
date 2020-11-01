import { ApolloCache, DocumentNode, useMutation } from "@apollo/client";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import { GraphQLError } from "graphql";
import { NextRouter, useRouter } from "next/dist/client/router";
import InputField from "../components/InputField";

interface Error {
  field: string;
  message: string;
}

interface updateData {
  data?: any;
  extensions?: Record<string, any> | undefined;
  context?: Record<string, any> | undefined;
  errors?: readonly GraphQLError[] | undefined;
}

type Props = {
  name: string;
  fields: string[];
  mutation: DocumentNode;
  onSubmit: (data: any, router: NextRouter) => Error | void;
  onError?: (router: NextRouter) => void;
  formProps?: FormikConfig<FormikValues>;
  handleUpdate?: (
    store: ApolloCache<any>,
    data: updateData,
    mutate: any
  ) => void;
  refetchQueries?: any;
};

export default function QuickForm({
  mutation,
  fields,
  onSubmit,
  formProps,
  handleUpdate,
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

        console.log("input", values);

        const response = await mutate({
          variables: { input: values },
          update: (cache, data) =>
            handleUpdate && handleUpdate(cache, data, mutate),
        });

        setSubmitting(false);
        resetForm();

        console.log("response", response);
        if (!response) return;

        const { data } = response;
        if (!data) return;

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
