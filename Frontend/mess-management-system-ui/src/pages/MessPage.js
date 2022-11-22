import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../components/mess";
import { Summary, Expenses, Students, Inventory, Consumption } from "./mess";

import { ContextProvider, useStateContext } from "../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import AsyncLoader from "../components/ui/AsyncLoader";
import { useSelector } from "react-redux";
import { loadItems } from "../store/inventory/actions";

const MessPage = () => {
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

  const { messId, page } = useParams();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* REMARK: Settings icon in bottom left corner. User for changing app theme*/}
        {/* START */}
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
        {/* END */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar messId={messId} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar messId={messId} />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }>
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            {/* dashboard  */}
            {page === "summary" && <Summary messId={messId} />}

            {/* pages  */}
            {page === "expenses" && <Expenses messId={messId} />}
            {page === "consumption" && <Consumption messId={messId} />}
            {page === "students" && <Students messId={messId} />}
            {page === "inventory" && <Inventory messId={messId} />}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const MessPageWithContext = () => {
  const { messId } = useParams();
  const loadInventoryResponseStatus = useSelector(
    (state) => state?.inventory?.messIdToStatusMap?.[messId]?.loadItems
  );

  return (
    <ContextProvider>
      <AsyncLoader
        responseStatus={loadInventoryResponseStatus}
        action={loadItems(messId)}>
        <MessPage />
      </AsyncLoader>
    </ContextProvider>
  );
};

export default MessPageWithContext;
