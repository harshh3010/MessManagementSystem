import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import EmailField from "../components/auth/EmailField";
import PasswordField from "../components/auth/PasswordField";
import LoginButton from "../components/auth/LoginButton";
import { useDispatch } from "react-redux";
import { login } from "../store/auth/actions";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onLoginClicked = (event) => {
    // TODO: Validate form
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(login(data.email, data.password));
  };

  return (
    <AuthForm title={"Sign In"} submitHandler={onLoginClicked}>
      <EmailField />
      <PasswordField />
      <LoginButton />
      <Link to="/login" style={{ display: "block", textAlign: "center" }}>
        Forgot Password?
      </Link>
      <Link to="/signup" style={{ display: "block", textAlign: "center" }}>
        Don't have an account? Sign up now.
      </Link>
    </AuthForm>
  );
};

export default LoginPage;
