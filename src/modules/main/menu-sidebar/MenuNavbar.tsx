import i18n from "@app/utils/i18n";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t("  बजेट स्रोत"),
    icon: "fas fa-file",
    path: "/bugetShrot",
  },
  {
    name: i18n.t("  समिति गठन"),
    icon: "fas fa-users",
    path: "/",
  },
  {
    name: i18n.t("  योजना/कार्यक्रम"),
    icon: "fas fa-columns",
    path: "/yojana",
  },
  {
    name: i18n.t("  नयाँ योजना/नयाँ कार्यक्रम"),
    icon: "fas fa-tasks",
    path: "/nayaYojana",
  },
  {
    name: i18n.t("  योजना संचालन प्रक्रिया "),
    icon: "fas fa-retweet",
    path: "/yojanaSanchalan",
  },
  {
    name: i18n.t("  कार्यक्रम संचालन प्रक्रिया "),
    icon: "fas fa-users",
    path: "/karyakramsanchalan",
  },
  {
    name: i18n.t("  रिपोर्ट "),
    icon: "fas fa-file ",
    children: [
      {
        name: i18n.t("सांख्यात्मक रिपोर्ट  "),
        path: "/quantitativeDetail",
      },
      {
        name: i18n.t("मलेप रिपोर्ट "),
        path: "/LanduseReport",
      },
      {
        name: i18n.t("समिति विस्तृत विवरण "),
        path: "/committeeDescription",
      },
      {
        name: i18n.t("योजना विस्तृत विवरण "),
        path: "/planDetail",
      },
    ],
  },
  {
    name: i18n.t("  सेटिङ"),
    icon: "fas fa-wrench",
    children: [
      {
        name: i18n.t("इकाई"),
        path: "/units",
      },
      {
        name: i18n.t("योजना जोड्नुहोस"),
        path: "/planForm",
      },
      {
        name: i18n.t("शर्तहरू"),
        path: "/terms",
      },
      {
        name: i18n.t("सुची दर्ता"),
        path: "/registrationList",
      },
      {
        name: i18n.t("कर्मचारी"),
        path: "/employees",
      },
      {
        name: i18n.t("बैंक"),
        path: "/bank",
      },
      {
        name: i18n.t("कट्टी विवरण"),
        path: "/deductionDetail",
      },
      {
        name: i18n.t("कन्टेनजेन्सी"),
        path: "/contengency",
      },
      {
        name: i18n.t("कर्मचारी पद"),
        path: "/employeePosition",
      },
      {
        name: i18n.t("लिंग"),
        path: "/genderTypes",
      },
      {
        name: i18n.t("खर्च किसिम"),
        path: "/expenceType",
      },
      {
        name: i18n.t("क्षेत्र"),
        path: "/fieldType",
      },
      {
        name: i18n.t("उप क्षेत्र"),
        path: "/subFieldType",
      },
      {
        name: i18n.t("अनुदानको किसिम"),
        path: "/grantType",
      },
      {
        name: i18n.t("Excel "),
        path: "/excel",
      },
      {
        name: i18n.t("विनियोजनको किसिम"),
        path: "/allocationType",
      },
      {
        name: i18n.t("समितिको पद"),
        path: "/committeePosition",
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const navbarVariant = useSelector((state: any) => state.ui.sidebarSkin);

  return (
    <nav
      className={`navbar navbar-expand-lg ${navbarVariant}`}
      style={{
        backgroundColor: "#ccccFf",
        display: "flex",
        marginTop: "-1px",
        padding: "2px",
        justifyContent: "center",
      }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {MENU.map((menuItem: IMenuItem) => (
            <li
              className={`nav-item${menuItem.children ? " dropdown" : ""}`}
              key={menuItem.name + menuItem.path}
            >
              {menuItem.children ? (
                <>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id={`${menuItem.name}-dropdown`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className={menuItem.icon}></i> {menuItem.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby={`${menuItem.name}-dropdown`}
                  >
                    {menuItem.children.map((child: IMenuItem) => (
                      <li key={child.name + child.path}>
                        <Link to={child.path} className="dropdown-item">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={menuItem.path} className="nav-link">
                  <i className={menuItem.icon}></i> {menuItem.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
