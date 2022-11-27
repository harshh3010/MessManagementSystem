import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from ".";
import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../store/auth/actions";

const UserProfile = () => {
  const { currentColor, handleClick } = useStateContext();
  const loggedInUser = useSelector((state) => state?.auth?.loggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          onClick={() => handleClick("user-profile")}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          {/* TODO: Load this data from store */}
          <p className="font-semibold text-xl dark:text-gray-200">
            {loggedInUser.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {loggedInUser.role.charAt(0).toUpperCase() +
              loggedInUser.role.slice(1)}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {loggedInUser.email}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
