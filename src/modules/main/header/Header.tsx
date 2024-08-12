import UserDropdown from "@app/modules/main/header/user-dropdown/UserDropdown";
import { Image } from "@profabric/react-components";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  const StyledBrandImage = styled(Image)`
    float: left;
    margin: 0.25px 3px;
    opacity: 0.8;
  `;
  return (
    <nav className={getContainerClasses()} style={{ marginLeft: 0 }}>
      <ul className="navbar-nav">
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="navbar-brand">
            <StyledBrandImage
              src="./src/assets/nepallogo.png"
              alt="AdminLTE Logo"
              width={30}
              height={30}
              rounded
            />
            <span className="brand-text font-weight-bold m-10">
              योजना/कार्यक्रम वेवस्थापन
            </span>
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <UserDropdown />
      </ul>
    </nav>
  );
};

export default Header;
