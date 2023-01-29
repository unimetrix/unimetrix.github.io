/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { InputLabel, Typography, Link } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { connectedState, urlState, userState } from '../../../../atome/atome';

const formStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'black',
  p: 4,
  ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
    width: '100%',
  },
};
const inputLabelStyle = {
  color: 'black',
  width: '100%',
  marginTop: '0.5em',
  '&:hover': { cursor: 'default' },
};
const inputStyle = {
  color: 'black', width: '100%',
};

function ModalConnection({
  open, handleClose, openModalSubscribe, openModalForgotPSW,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [, setConnected] = useRecoilState(connectedState);
  const [, setUser] = useRecoilState(userState);
  const [url] = useRecoilState(urlState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const connect = async () => {
    try {
      const response = await axios.post(`${url}/login`, { email, password });
      const { user } = response.data;
      localStorage.setItem('token', user);
      const userToken = decodeToken(user);
      setUser(userToken);
      setConnected(true);
      setErrorMessage('');
      setEmail('');
      setPassword('');
      handleClose();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setConnected(false);
    }
  };
  const handleOpenModalSubscribe = () => {
    handleClose();
    openModalSubscribe();
  };

  const handleOpenModalForgotPsw = () => {
    handleClose();
    openModalForgotPSW();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // TODO Mettre en place le système de JWT

    await connect();

    // et setConnected true si j'ai une réponse positif sinon afficher message d'erreur
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePsw = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setErrorMessage('');
        setEmail('');
        setPassword('');
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box component="form" onSubmit={onSubmit} sx={formStyle}>

        <Typography variant="h6">Log In</Typography>
        <Typography variant="caption">
          New to Unimetrix ? &nbsp;
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={handleOpenModalSubscribe}
          >
            Create an account

          </Link>
        </Typography>
        {!errorMessage !== '' ? (
          <Typography sx={{
            backgroundColor: 'rgb(163 22 22);', textAlign: 'center', borderRadius: '5px', color: 'white;',
          }}
          >
            {errorMessage}
          </Typography>
        ) : ''}
        <InputLabel sx={inputLabelStyle}>
          Email Address

        </InputLabel>
        <Input value={email} onChange={handleChangeEmail} sx={inputStyle} placeholder="Enter your email..." />
        <InputLabel sx={inputLabelStyle} type="password">
          Password
          {' '}
          <Typography sx={{ float: 'right' }} mb={1} variant="caption">
            <Link sx={{ cursor: 'pointer' }} onClick={handleOpenModalForgotPsw}>Forgot Password ?</Link>
          </Typography>
          {' '}
        </InputLabel>
        <Input type="password" value={password} onChange={handleChangePsw} sx={inputStyle} placeholder="Enter your password..." />

        <Button sx={{ width: '100%', marginTop: '1em' }} type="submit" variant="contained">
          Log in
        </Button>

      </Box>
    </Modal>
  );
}
ModalConnection.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  openModalSubscribe: PropTypes.func.isRequired,
  openModalForgotPSW: PropTypes.func.isRequired,

};
export default ModalConnection;
