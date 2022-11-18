import CustomTextField from "../ui/CustomTextField";

const EmailField = (props) => {
  return (
    <CustomTextField
      id="email"
      label="Email"
      name="email"
      autoComplete="email"
    />
  );
};

export default EmailField;
