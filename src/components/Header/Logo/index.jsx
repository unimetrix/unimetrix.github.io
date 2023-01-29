import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from './logo--dark.svg';
import './index.scss';

function Logo() {
  return (
    <NavLink
      to="/"
      end
    >
      <img
        className="logo"
        src={logo}
        alt="logo MetriX"
      />
    </NavLink>
  );
}

export default Logo;
