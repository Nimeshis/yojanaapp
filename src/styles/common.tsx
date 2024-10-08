import {
  Dropdown,
  Image,
  Button as RawButton,
  Checkbox as RawCheckbox,
  Select as RawSelect,
} from '@profabric/react-components';
import styled from 'styled-components';

export const Button = styled(RawButton)`
  --pf-display: block;
  --pf-width: 100%;
  background-color: green;
`;
export const TealButton = styled(RawButton)`
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  display: block;
  &:hover {
    background-color: green;
  }
  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;
export const Select = styled(RawSelect)`
  --pf-width: 100%;
  --pf-display: block;
`;

export const Checkbox = styled(RawCheckbox)`
  --pf-display: block;
`;

export const StyledDropdown = styled(Dropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 10rem;

  .dropdown-item {
    padding: 0.5rem 1rem;
  }

  .text-sm {
    margin-bottom: 0;
  }
  .dropdown-divider {
    margin: 0;
  }
`;

export const StyledSmallUserImage = styled(Image)`
  margin-top: 3px;
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

export const StyledBigUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
  --pf-border: 3px solid #000;
`;
