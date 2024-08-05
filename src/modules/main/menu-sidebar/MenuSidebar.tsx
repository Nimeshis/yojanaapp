import { SidebarSearch } from "@app/components/sidebar-search/SidebarSearch";
import i18n from "@app/utils/i18n";
import { MenuItem } from "@components";
import { Image } from "@profabric/react-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [

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
      }, {
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

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">योजना </span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch />
        </div>

        <nav className="mt-2" style={{ overflowY: "hidden" }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? " nav-flat" : ""
            }${menuChildIndent ? " nav-child-indent" : ""}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
