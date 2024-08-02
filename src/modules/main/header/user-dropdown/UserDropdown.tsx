import { setAuthentication } from '@app/store/reducers/auth';
import { StyledSmallUserImage } from '@app/styles/common';
import {
  UserFooter,
  UserMenuDropdown
} from '@app/styles/dropdown-menus';
import { GoogleProvider } from '@app/utils/oidc-providers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

declare const FB: any;

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const authentication = useSelector((state: any) => state.auth.authentication);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    console.log('authentication', authentication);
    if (authentication.profile.first_name) {
      await GoogleProvider.signoutPopup();
      dispatch(setAuthentication(undefined));
      navigate('/login');
    } else if (authentication.userID) {
      FB.logout(() => {
        dispatch(setAuthentication(undefined));
        navigate('/login');
      });
    } else {
      dispatch(setAuthentication(undefined));
      navigate('/login');
    }
    localStorage.removeItem('authentication');
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        src={authentication.profile.picture}
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="body">
       
        <UserFooter>
          <ul>
            <li>
              <FaUser/>
          <button
            type="button"
            className="btn btn-default btn-flat "
            onClick={navigateToProfile}
            >
            {t('प्रोफाइल')}
          </button>
          </li>
            <li>
          <button
            type="button"
            className="btn btn-default btn-flat "
            onClick={logOut}
          >
            {t('साइन आउट')}
          </button>
              
            </li>
          </ul>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  );
};

export default UserDropdown;
