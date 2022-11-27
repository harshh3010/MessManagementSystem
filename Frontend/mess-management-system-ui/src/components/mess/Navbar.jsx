import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { UserProfile } from ".";
import { useStateContext } from "../../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import CustomDropDown from "../ui/CustomDropDown";
import { useNavigate } from "react-router-dom";
import { Button } from ".";
import { setSelectedMess } from "../../store/mess/actions";
import CustomDialog from "../ui/CustomDialog";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = (props) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const dispatch = useDispatch();

  const userName = useSelector((state) => state?.auth?.loggedInUser?.name);
  const messes = useSelector((state) => state?.mess?.messes);
  const selectedMess = useSelector((state) => state?.mess?.selectedMess);

  const [addDialogVisible, setAddDialogVisible] = useState(false);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <CustomDialog
        visible={addDialogVisible}
        onClose={() => setAddDialogVisible(false)}
      />
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <CustomDropDown
          fields={{ text: "name", value: "id" }}
          placeholder="Select a mess"
          data={messes.map((mess) => ({ name: mess.name, id: mess._id }))}
          value={selectedMess}
          width="100"
          onValueChanged={(value) => {
            dispatch(setSelectedMess(value));
          }}
        />
        <div className="p-2" />
        {props.userRole === "admin" && (
          <Button
            color="white"
            bgColor={currentColor}
            text="Add new mess"
            borderRadius="10px"
            width="full"
            onClick={() => {
              setAddDialogVisible(true);
            }}
          />
        )}
      </div>
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}>
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userName?.split(" ")[0]}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
