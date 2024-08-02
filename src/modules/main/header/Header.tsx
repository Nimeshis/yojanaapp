import UserDropdown from '@app/modules/main/header/user-dropdown/UserDropdown';
import {
  toggleControlSidebar,
  toggleSidebarMenu,
} from '@app/store/reducers/ui';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  const handleToggleControlSidebar = () => {
    dispatch(toggleControlSidebar());
  };

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  return (
    <nav className={getContainerClasses()}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            {t('योजना  ')}
          </Link>
        </li>
        
      </ul>
      <ul className="navbar-nav ml-auto">
        
        <UserDropdown />
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
