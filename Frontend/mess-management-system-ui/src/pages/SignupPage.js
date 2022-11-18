import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import NameField from "../components/auth/NameField";
import EmailField from "../components/auth/EmailField";
import PasswordField from "../components/auth/PasswordField";
import ConfirmPasswordField from "../components/auth/ConfirmPasswordField";
import SignupButton from "../components/auth/SignupButton";
import { useDispatch } from "react-redux";
import { signup } from "../store/auth/actions";

const SignupPage = () => {
  const dispatch = useDispatch();

  const onSignupClicked = (event) => {
    // TODO: Validate form
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };
    dispatch(signup(data.name, data.email, data.password));
  };

  return (
    <AuthForm title={"Sign Up"} submitHandler={onSignupClicked}>
      <NameField />
      <EmailField />
      <PasswordField />
      <ConfirmPasswordField />
      <SignupButton />
      <Link to="/login" style={{ display: "block", textAlign: "center" }}>
        Already have an account? Sign in.
      </Link>
    </AuthForm>
  );
};

export default SignupPage;
