import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMesses } from "../store/mess/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMesses());
  }, [dispatch]);

  return <div>Home Page</div>;
};

export default HomePage;
