import Button from "@mui/material/Button";

const CustomButton = (props) => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      {props.label}
    </Button>
  );
};

export default CustomButton;
