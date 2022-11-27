import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";
import { useCurrentPath } from "./components/hooks/useCurrentPath";
import LoginPage from "./pages/LoginPage";
import MessPage from "./pages/MessPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import SplashPage from "./pages/SplashPage";
import { loadUserInfo } from "./store/auth/actions";
import { LOGIN_STATUS } from "./store/auth/constants";
import "./App.css";

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
    { path: "/home", element: <MessPage page="routines" /> },
    { path: "/summary", element: <MessPage page="summary" /> },
    { path: "/expenses", element: <MessPage page="expenses" /> },
    { path: "/consumption", element: <MessPage page="consumption" /> },
    { path: "/students", element: <MessPage page="students" /> },
    { path: "/inventory", element: <MessPage page="inventory" /> },
    { path: "/routines", element: <MessPage page="routines" /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "*", element: <PageNotFound /> },
  ]);
};

export default App;
