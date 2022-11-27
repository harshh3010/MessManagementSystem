import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../components/mess";
import {
  Summary,
  Expenses,
  Students,
  Inventory,
  Consumption,
  MessRoutines,
} from "./mess";

import { ContextProvider, useStateContext } from "../contexts/ContextProvider";
import AsyncLoader from "../components/ui/AsyncLoader";
import { useSelector } from "react-redux";
import ErrorPage from "../components/ui/ErrorPage";
import { loadMesses, setCreateMessResponseStatus } from "../store/mess/actions";
import AsyncResponseToast from "../components/ui/AsyncResponseToast";
import { RESPONSE_STATUS } from "../store/commons/constants";

const MessPage = (props) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const messId = useSelector((state) => state?.mess?.selectedMess);
  const page = props.page;

  const userRole = useSelector((state) => state?.auth?.loggedInUser?.role);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu && messId ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar messId={messId} userRole={userRole} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar messId={messId} userRole={userRole} />
          </div>
        )}
        <div
          className={
            activeMenu && messId
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }>
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar userRole={userRole} />
          </div>
          {messId && (
            <div>
              {themeSettings && <ThemeSettings />}

              {/* dashboard  */}
              {page === "summary" && <Summary messId={messId} />}

              {/* pages  */}
              {page === "expenses" && <Expenses messId={messId} />}
              {page === "consumption" && <Consumption messId={messId} />}
              {page === "students" && <Students messId={messId} />}
              {page === "inventory" && <Inventory messId={messId} />}
              {page === "routines" && (
                <MessRoutines messId={messId} userRole={userRole} />
              )}
            </div>
          )}
          {!messId && <ErrorPage error="Please select a mess to continue" />}
          <Footer />
        </div>
      </div>
    </div>
  );
};

const MessPageWithContext = (props) => {
  const loadMessesResponseStatus = useSelector(
    (state) => state.mess.status.loadMesses
  );
  const createMessResponseStatus = useSelector(
    (state) => state.mess.status.createMess
  );

  return (
    <AsyncLoader
      responseStatus={loadMessesResponseStatus}
      action={loadMesses()}>
      <AsyncResponseToast
        responseStatus={createMessResponseStatus}
        successMessage="Mess created successfully!"
        failureMessage="Unable to create a new mess!"
        action={setCreateMessResponseStatus(RESPONSE_STATUS.NONE)}
      />
      <ContextProvider>
        <MessPage page={props.page} />
      </ContextProvider>
    </AsyncLoader>
  );
};

export default MessPageWithContext;
