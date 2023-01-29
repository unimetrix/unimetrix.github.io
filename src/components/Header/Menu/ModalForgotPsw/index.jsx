/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { InputLabel, Typography, Link } from '@mui/material';
import { useState } from 'react';
import EmailValidator from 'email-validator';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { urlState } from '../../../../atome/atome';

const formStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'black',
  p: 4,
  ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
    width: '50%',
  },
  ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
    width: '100%',
  },
};
const inputLabelStyle = {
  color: 'black',
  width: '100%',
  marginBottom: '0.2em',
  marginTop: '1em',
  fontSize: '0.9rem',
  '&:hover': { cursor: 'default' },
};
const inputStyle = {
  color: 'black', width: '100%',
};

function ModalForgotPsw({ open, handleClose, handleOpenLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [url] = useRecoilState(urlState);

  const onSubmit = async (event) => {
    event.preventDefault();
    const emailValidate = EmailValidator.validate(email);
    if (!emailValidate) {
      setMessage('Your email is invalid');
    } else {
      try {
        await axios.post(`${url}/login/forgot-password`, { email });
      } catch (error) {
        throw setMessage(error.message);
      }
      setMessage('We just sent you and email with a reset password link');
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const openLogin = () => {
    handleClose();
    setMessage('');
    setEmail('');
    handleOpenLogin();
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setMessage('');
        setEmail('');
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box component="form" onSubmit={onSubmit} sx={formStyle}>

        <Typography mb={0} variant="h6">Forgot Password</Typography>
        <Typography sx={{ marginBottom: '1rem' }} variant="caption">
          If you remember your password go back to &nbsp;
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={openLogin}
          >
            Log in
          </Link>
        </Typography>
        <InputLabel sx={inputLabelStyle}>
          Enter your email address below
          <br />
          We&apos;ll send you password reset instructions
          <br />
        </InputLabel>
        <Input value={email} onChange={handleChangeEmail} sx={inputStyle} placeholder="Enter your email..." />
        <Button sx={{ width: '100%', marginTop: '1em' }} type="submit" variant="contained">
          RESET PASSWORD
        </Button>
        <Typography sx={{ marginTop: '0.5rem', color: '#bd8b51', fontSize: '0.9rem' }}>{message}</Typography>
      </Box>
    </Modal>
  );
}
ModalForgotPsw.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpenLogin: PropTypes.func.isRequired,

};
export default ModalForgotPsw;
