import { useLocation, matchRoutes } from "react-router-dom";

const routes = [
  { path: "/" },
  { path: "/login" },
  { path: "/signup" },
  { path: "/home" },
];

export const useCurrentPath = () => {
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);
  return route.path.trim();
};
