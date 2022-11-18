import CustomTextField from "../ui/CustomTextField";

const NameField = (props) => {
  return (
    <CustomTextField
      id="name"
      label="Full Name"
      name="name"
      autoComplete="name"
    />
  );
};

export default NameField;
