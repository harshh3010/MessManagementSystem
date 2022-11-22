import { useSelector } from "react-redux";
import { loadMesses } from "../store/mess/actions";
import AsyncLoader from "../components/ui/AsyncLoader";

import { Link } from "react-router-dom";

const HomePage = () => {
  const loadMessesResponseStatus = useSelector(
    (state) => state.mess.status.loadMesses
  );

  const messes = useSelector((state) => state.mess.messes);

  return (
    <AsyncLoader
      responseStatus={loadMessesResponseStatus}
      action={loadMesses()}>
      <div>Your Messes</div>
      <ul>
        {messes.map((mess) => (
          <Link to={`/${mess._id}/summary`}> {mess.name}</Link>
        ))}
      </ul>
    </AsyncLoader>
  );
};

export default HomePage;
