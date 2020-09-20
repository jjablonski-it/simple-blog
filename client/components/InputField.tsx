import { FormControl, TextField, TextFieldProps } from "@material-ui/core";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  inputProps?: TextFieldProps;
};

const InputField = (props: Props) => {
  const [field, { error }] = useField(props);

  const { name } = field;
  return (
    <FormControl fullWidth>
      {/* <FormLabel htmlFor={name}>{name}</FormLabel> */}
      <TextField
        {...field}
        id={name}
        placeholder={name}
        fullWidth
        {...props.inputProps}
        error={!!error}
        helperText={!!error && error}
        type={name === "password" ? "password" : "text"}
      />
    </FormControl>
  );
};

export default InputField;
