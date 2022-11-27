import { Link, NavLink } from "react-router-dom";
import { SiIfood } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineCalendar, AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStoreFill } from "react-icons/ri";

import { useStateContext } from "../../contexts/ContextProvider";

const getLinksWithNullsFiltered = (links) => {
  const res = [];
  links.forEach((link) => {
    const sublinks = [];
    link.links.forEach((sublink) => {
      if (sublink) sublinks.push(sublink);
    });
    if (sublinks.length !== 0) res.push({ title: link.title, links: sublinks });
  });
  return res;
};

const Sidebar = (props) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const links = [
    {
      title: "Summary",
      links: [
        props.userRole !== "student" && {
          name: "summary",
          icon: <FiShoppingBag />,
        },
      ],
    },
    {
      title: "Pages",
      links: [
        {
          name: "routines",
          icon: <AiOutlineCalendar />,
        },
        props.userRole !== "student" && {
          name: "expenses",
          icon: <AiOutlineShoppingCart />,
        },
        props.userRole !== "student" && {
          name: "consumption",
          icon: <IoMdContacts />,
        },
        props.userRole !== "student" && {
          name: "students",
          icon: <RiContactsLine />,
        },
        props.userRole !== "student" && {
          name: "inventory",
          icon: <RiStoreFill />,
        },
      ],
    },
  ];

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiIfood /> <span>Mess App</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {getLinksWithNullsFiltered(links)?.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }>
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
