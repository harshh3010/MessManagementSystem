import { useSelector } from "react-redux";
import { loadMesses } from "../store/mess/actions";
import AsyncLoader from "../components/ui/AsyncLoader";

const HomePage = () => {
  const loadMessesResponseStatus = useSelector(
    (state) => state.mess.status.loadMesses
  );

  return (
    <AsyncLoader responseStatus={loadMessesResponseStatus} action={loadMesses}>
      <div>Home Page</div>
    </AsyncLoader>
  );
};

export default HomePage;
