import React, { useEffect } from 'react';
import './index.scss';
// import Box from '@mui/material/Box';
import {
  useRecoilState,

} from 'recoil';
import { decodeToken } from 'react-jwt';
import { userState, connectedState } from '../../atome/atome';

import Logo from './Logo';
import Select from './Select';

// eslint-disable-next-line react/prop-types, no-unused-vars
function Header() {
  const [, setUser] = useRecoilState(userState);
  const [, setConnected] = useRecoilState(connectedState);
  useEffect(() => {
    if (localStorage.getItem('token') !== null || undefined) {
      const userToken = decodeToken(localStorage.getItem('token'));
      setUser(userToken);
      setConnected(true);
    } else {
      setConnected(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <Logo />
      <Select />
    </div>
  );
}

export default Header;
