import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import welcomeLogo from '../../assets/welcome.json';
import {
  urlState,
  connectedState,
} from '../../atome/atome';

const modalStyle = {
  flexGrow: '1',
  margin: 'auto',
  marginTop: '8rem',
  width: '50%',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'black',
  p: 4,
  ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
    width: '100%',
  },
  textAlign: 'center',
};

function WelcomeModal() {
  const [url] = useRecoilState(urlState);
  const [open, setOpen] = useState(true);
  const [, setIsConnected] = useRecoilState(connectedState);

  const navigate = useNavigate();
  const { token } = useParams();
  localStorage.setItem('token', token);
  const tokenLocal = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${tokenLocal}` },
  };
  useEffect(() => {
    async function emailValidation() {
      try {
        await axios.post(`${url}/login/email-validation`, {}, config);
        setOpen(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    emailValidation();
    setIsConnected(false);
  }, []);

  const handleCloseWelcome = () => {
    navigate('/');
    setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: '1' }}>
      <Modal
        open={open}
        onClose={handleCloseWelcome}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={modalStyle}>
          <Typography sx={{ fontSize: '2em', width: '100%' }} mb={2} align="center" paragraph>Welcome to UniMetrix </Typography>
          <Typography sx={{ fontSize: '1em', width: '100%' }} mb={2} align="center" paragraph>Your account was created with success </Typography>
          <div className="select-item--fav">
            <Player
              loop={false}
              autoplay
              controls
              style={{ height: '300px', width: '300px' }}
              src={welcomeLogo}
              keepLastFrame
            />
          </div>
        </Box>
      </Modal>
    </Box>
  );
}

export default WelcomeModal;
