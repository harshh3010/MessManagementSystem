import TextField from "@mui/material/TextField";

const CustomTextField = (props) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={props.id}
      label={props.label}
      id={props.id}
      type={props.type}
      {...props}
    />
  );
};

export default CustomTextField;
