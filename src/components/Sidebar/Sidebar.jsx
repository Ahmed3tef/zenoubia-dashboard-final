import React, { useEffect, useState } from "react";
import { ImUser } from "react-icons/im";
import { IoLayersSharp } from "react-icons/io5";
import { IoIosMail, IoIosResize } from "react-icons/io";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineLiquor, MdColorLens, MdLanguage } from "react-icons/md";
import sidebarPlaceholder from "../../assets/sidebar-plcaeholder.png";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { loadAdmin } from "../../store/reducers/admin";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import menuBar from "../../assets/burgerIcon.svg";
import { changeLanguage } from "i18next";

const localLang = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : null;

const Sidebar = (props) => {
  const { t } = useTranslation();

  const { imageUrl, name } = useSelector((state) => state.admin.admin);
  const token = useSelector((state) => state.auth.token);
  const [showSidebar, setShowSidebar] = useState(true);
  const [image, setImage] = useState();
  const [adminName, setAdminName] = useState();
  const [lang, setLang] = useState(localLang || "fr");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSidebarHandler = () => {
    setShowSidebar(!showSidebar);
  };
  const sidebarData = [
    { title: t("profile"), icon: <ImUser />, tab: "profile" },
    {
      title: t("categories"),
      icon: <IoLayersSharp />,
      tab: "subcategories",
    },
    { title: t("products"), icon: <MdOutlineLiquor />, tab: "products" },
    { title: t("orders"), icon: <RiFileList3Line />, tab: "orders" },
    { title: t("colors"), icon: <MdColorLens />, tab: "colors" },
    { title: t("sizes"), icon: <IoIosResize />, tab: "sizes" },
    { title: t("contact"), icon: <IoIosMail />, tab: "contact" },
    { title: t("country"), icon: <GiEarthAfricaEurope />, tab: "countries" },
    {
      title: t("government"),
      icon: <GiEarthAfricaEurope />,
      tab: "governments",
    },
    { title: t("city"), icon: <GiEarthAfricaEurope />, tab: "cities" },
    { title: t("reports"), icon: <FaChartLine />, tab: "reports" },
  ];

  // {!showSidebar && ()}  ${showSidebar ? '' : ' sidebar-small'
  useEffect(() => {
    setImage(imageUrl);
    setAdminName(name);
  }, [imageUrl, name]);

  useEffect(() => {
    dispatch(loadAdmin(token));
  }, [dispatch, token]);

  const navLinkClickHandler = (path) => {
    props.setCurrentTab(path);
    navigate(`/${path}`);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    changeLanguage(lang);
    localStorage.setItem("language", lang);
    document
      .getElementsByTagName("html")[0]
      .setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const toggleLanguageHandler = () => {
    setLang(lang === "fr" ? "ar" : "fr");
  };

  return (
    <aside className={`sidebar ${showSidebar ? "" : " sidebar-small"}`}>
      <div className="sidebar__menu">
        <img
          src={menuBar}
          alt="burger menuBar"
          onClick={toggleSidebarHandler}
        />

        <MdLanguage onClick={toggleLanguageHandler} />
      </div>

      <div className="sidebar__img">
        <img src={image ? image : sidebarPlaceholder} alt="profile img" />
      </div>
      <h3 className="user-name">{adminName ? adminName : "Admin"}</h3>
      <div className="sidebar__nav">
        <div className="sidebar__section">
          {sidebarData.map((bar, i) => (
            <div
              className={`sidebar__link ${
                bar.tab === props.currentTab ? "active" : ""
              }`}
              key={i}
              onClick={() => navLinkClickHandler(bar.tab)}
            >
              <div className="sidebar__icon">{bar.icon}</div>

              <div className="sidebar__caption">{bar.title}</div>
            </div>
          ))}
          <div
            className={`sidebar__link ${
              props.currentTab === "logout" ? "active" : ""
            }`}
            onClick={logoutHandler}
          >
            <div className="sidebar__icon">
              <FaPowerOff />
            </div>

            <div className="sidebar__caption">{t("logout")}</div>
          </div>
        </div>

        {/* {showSidebar && (
          <>
            {sidebarData.map((categoryArr, index) => (
              <div className='sidebar__section' key={index}>
                {categoryArr.map(category => (
                  <div className='sidebar__link' key={category.id}>
                    <div className='sidebar__icon'>{category.icon}</div>
                    <div className='sidebar__caption'>{category.name}</div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )} */}
      </div>
    </aside>
  );
};

export default Sidebar;
