import Header from "@app/modules/main/header/Header";
import { addWindowClass, removeWindowClass } from "@app/utils/helpers";
import { Image } from "@profabric/react-components";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./menu-sidebar/MenuNavbar";

const Main = () => {
  const menuSidebarCollapsed = useSelector(
    (state: any) => state.ui.menuSidebarCollapsed
  );
  const controlSidebarCollapsed = useSelector(
    (state: any) => state.ui.controlSidebarCollapsed
  );
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const authentication = useSelector((state: any) => state.auth.authentication);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    setIsAppLoaded(Boolean(authentication));
  }, [authentication]);

  useEffect(() => {
    removeWindowClass("register-page");
    removeWindowClass("login-page");
    removeWindowClass("hold-transition");

    addWindowClass("sidebar-mini");

    // fetchProfile();
    return () => {
      removeWindowClass("sidebar-mini");
    };
  }, []);

  useEffect(() => {
    removeWindowClass("sidebar-closed");
    removeWindowClass("sidebar-collapse");
    removeWindowClass("sidebar-open");
    if (menuSidebarCollapsed && screenSize === "lg") {
      addWindowClass("sidebar-collapse");
    } else if (menuSidebarCollapsed && screenSize === "xs") {
      addWindowClass("sidebar-open");
    } else if (!menuSidebarCollapsed && screenSize !== "lg") {
      addWindowClass("sidebar-closed");
      addWindowClass("sidebar-collapse");
    }
  }, [screenSize, menuSidebarCollapsed]);

  useEffect(() => {
    if (controlSidebarCollapsed) {
      removeWindowClass("control-sidebar-slide-open");
    } else {
      addWindowClass("control-sidebar-slide-open");
    }
  }, [screenSize, controlSidebarCollapsed]);

  const getAppTemplate = useCallback(() => {
    if (!isAppLoaded) {
      return (
        <div className="preloader flex-column justify-content-center align-items-center">
          <Image
            className="animation__shake"
            src="./src/assets/nepallogo.png "
            alt="NepalSarkharLogo"
            height={60}
            width={60}
          />
        </div>
      );
    }
    return (
      <>
        <Header />

        <Navbar />

        <div className="content-wrapper">
          <div className="pt-3" />
          <section className="content">
            <Outlet />
          </section>
        </div>
      </>
    );
  }, [isAppLoaded]);

  return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
