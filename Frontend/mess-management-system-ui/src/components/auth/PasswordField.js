import CustomTextField from "../ui/CustomTextField";

const PasswordField = (props) => {
  return (
    <CustomTextField
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
  );
};

export default PasswordField;
