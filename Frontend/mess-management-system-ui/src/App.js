import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";
import { useCurrentPath } from "./components/hooks/useCurrentPath";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import SplashPage from "./pages/SplashPage";
import { loadUserInfo } from "./store/auth/actions";
import { LOGIN_STATUS } from "./store/auth/constants";

const App = () => {
  // Redirecting the user to proper page using login status
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = useCurrentPath();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  useEffect(() => {
    switch (loginStatus) {
      case LOGIN_STATUS.LOGGED_IN:
        if (
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === "/signup"
        ) {
          navigate("/home");
        }
        break;
      case LOGIN_STATUS.LOGGED_OUT:
        if (currentPath !== "/login" && currentPath !== "/signup") {
          navigate("/login");
        }
        break;
      default:
        navigate("/");
        dispatch(loadUserInfo());
        break;
    }
  }, [currentPath, loginStatus, navigate, dispatch]);

  return useRoutes([
    { path: "/", element: <SplashPage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "*", element: <PageNotFound /> },
  ]);
};

export default App;
