import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";

const App = () =>
  useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "*", element: <PageNotFound /> },
  ]);

export default App;
