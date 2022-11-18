import CustomTextField from "../ui/CustomTextField";

const ConfirmPasswordField = (props) => {
  return (
    <CustomTextField
      id="confirm-password"
      label="Confirm Password"
      name="confirm-password"
      type="password"
      autoComplete="confirm-password"
    />
  );
};

export default ConfirmPasswordField;
