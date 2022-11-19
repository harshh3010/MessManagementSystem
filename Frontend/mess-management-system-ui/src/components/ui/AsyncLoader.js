import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";
import { RESPONSE_STATUS } from "../../store/commons/constants";

const AsyncLoader = (props) => {
  const dispatch = useDispatch();
  const [screenState, setScreenState] = useState("loading");
  useEffect(() => {
    switch (props.responseStatus) {
      case RESPONSE_STATUS.PENDING:
        setScreenState("loading");
        break;
      case RESPONSE_STATUS.FAILED:
        setScreenState("failed");
        break;
      case RESPONSE_STATUS.SUCCESS:
        setScreenState("success");
        break;
      default:
        setScreenState("loading");
        dispatch(props.action());
        break;
    }
  }, [dispatch, props]);

  return (
    <>
      {screenState === "loading" && <LoadingScreen />}
      {screenState === "failed" && (
        <ErrorPage error="Unable to display this page!" />
      )}
      {screenState === "success" && <>{props.children}</>}
    </>
  );
};

export default AsyncLoader;
