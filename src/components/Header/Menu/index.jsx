/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './index.scss';
import Button from '@mui/material/Button';
import {
  useRecoilState,

} from 'recoil';
import ModalConnection from './ModalConnection';
import ModalSubscribe from './ModalSubscribe';
import { connectedState, userState } from '../../../atome/atome';
import userLogo from '../../../assets/user.png';
import ModalForgotPsw from './ModalForgotPsw';
import ModalReceiveMail from './ModalReceiveMail';

// eslint-disable-next-line react/prop-types
function Menu() {
  const [openModalConnection, setOpenModalConnection] = useState(false);
  const [openModalSubscribe, setOpenModalSubscribe] = useState(false);
  const [openModalForgotPsw, setOpenModalForgotPsw] = useState(false);
  const [openModalReceiveMail, setOpenModalReceiveMail] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isConnected, setIsConnected] = useRecoilState(connectedState);

  const handleOpenModalForgotPsw = () => { setOpenModalForgotPsw(true); };
  const handleCloseModalForgotPsw = () => setOpenModalForgotPsw(false);

  const handleOpenConnection = () => { setOpenModalConnection(true); };
  const handleCloseConnection = () => setOpenModalConnection(false);

  const handleOpenSubscribe = () => { setOpenModalSubscribe(true); };
  const handleCloseSubscribe = () => setOpenModalSubscribe(false);

  const handleOpenReceveilMail = () => { setOpenModalReceiveMail(true); };
  const handleCloseReceiveMail = () => setOpenModalReceiveMail(false);

  // const isConnected = useRecoilValue(connectedState);
  const handleDisconnect = () => {
    setIsConnected(false);
    setUser('');
    localStorage.removeItem('token');
  };

  return (
    <div className="menu">
      {
        isConnected
          ? (
            <>
              <div className="menu-connected">
                {' '}
                <img className="menu-connected--userlogo" src={userLogo} alt="userLogo" />
                {' '}
                <p>{user?.partialEmail}</p>
              </div>
              <Button onClick={handleDisconnect} variant="outlined">Log out</Button>
            </>
          )
          : (
            <>
              <Button onClick={handleOpenConnection} variant="outlined">Sign in</Button>
              <Button onClick={handleOpenSubscribe} variant="contained">Sign up</Button>
            </>
          )
}
      <ModalConnection
        open={openModalConnection}
        handleOpen={handleOpenConnection}
        handleClose={handleCloseConnection}
        openModalSubscribe={handleOpenSubscribe}
        openModalForgotPSW={handleOpenModalForgotPsw}
      />
      <ModalSubscribe
        open={openModalSubscribe}
        handleOpen={handleOpenSubscribe}
        handleClose={handleCloseSubscribe}
        handleOpenLogin={handleOpenConnection}
        handleOpenReceveilMail={handleOpenReceveilMail}
      />

      <ModalForgotPsw
        open={openModalForgotPsw}
        handleOpen={handleOpenModalForgotPsw}
        handleClose={handleCloseModalForgotPsw}
        handleOpenLogin={handleOpenConnection}
      />

      <ModalReceiveMail
        open={openModalReceiveMail}
        handleClose={handleCloseReceiveMail}

      />

    </div>
  );
}

export default Menu;
