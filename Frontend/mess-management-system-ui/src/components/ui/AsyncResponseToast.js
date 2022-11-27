import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { RESPONSE_STATUS } from "../../store/commons/constants";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const AsyncResponseToast = (props) => {
  const toastInstance = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.responseStatus === RESPONSE_STATUS.SUCCESS) {
      toastInstance.current.show({
        title: "Success",
        content: props.successMessage,
        cssClass: `e-toast-success`,
      });
      dispatch(props.action);
    } else if (props.responseStatus === RESPONSE_STATUS.FAILED) {
      toastInstance.current.show({
        title: "Failed",
        content: props.failureMessage,
        cssClass: `e-toast-danger`,
      });
      dispatch(props.action);
    }
  }, [props, dispatch]);

  return (
    <div>
      <div id="#toast_target" />
      <ToastComponent
        id="toast_target"
        ref={toastInstance}
        position={{ X: "Center", Y: "Top" }}
      />
    </div>
  );
};

export default AsyncResponseToast;
