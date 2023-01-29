/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { InputLabel, Typography, Link } from '@mui/material';
import { useState } from 'react';
import EmailValidator from 'email-validator';
import passwordValidate from 'password-validator';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRecoilState } from 'recoil';

import { urlState } from '../../../../atome/atome';

// const { REAT_APP_CAPTCHA_KEY } = process.env;

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

// eslint-disable-next-line new-cap
const schema = new passwordValidate();
schema
  .is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2); // Must have at least 2 digits

function ModalSubscribe({
  open, handleClose, handleOpenLogin, handleOpenReceveilMail,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [valideSubscribe, setValideSubscribe] = useState(true);
  const [url] = useRecoilState(urlState);
  const [errorMessage, setErrorMessage] = useState('');
  const [verify, setVerify] = useState(false);

  const openModalConnection = () => {
    handleClose();
    handleOpenLogin();
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePsw = (event) => {
    setPassword(event.target.value);
  };

  const subscribeValidation = (emailToValidate, passwordToValidate) => {
    const emailValidate = EmailValidator.validate(emailToValidate);
    const pswValidate = schema.validate(passwordToValidate);
    return emailValidate && pswValidate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (subscribeValidation(email, password)) {
      setValideSubscribe(true);
      try {
        setVerify(false);
        await axios.post(`${url}/login/signup`, { email, password });
        handleOpenReceveilMail();
        handleClose();
        setEmail('');
        setPassword('');
        setErrorMessage('');
      } catch (error) {
        setValideSubscribe(false);
        throw setErrorMessage(error.response.data.message);
      }
    } else {
      setValideSubscribe(false);
      setErrorMessage('login failed ! Invalid email or password');
    }
  };
  function captchaOnChange() {
    setVerify(true);
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        setEmail('');
        setPassword('');
        setVerify(false);
        setErrorMessage('');
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
        <Typography variant="h6">Sign up</Typography>
        <Typography variant="caption">
          Already have an account ? &nbsp;
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              openModalConnection();
            }}
          >
            Log in
          </Link>
        </Typography>
        {!valideSubscribe ? (
          <Typography sx={{
            backgroundColor: 'rgb(163 22 22);', textAlign: 'center', borderRadius: '5px', color: 'white;',
          }}
          >
            {errorMessage}
          </Typography>
        ) : ''}
        <InputLabel sx={inputLabelStyle}>Email Address</InputLabel>
        <Input value={email} onChange={handleChangeEmail} type="text" name="email" sx={inputStyle} placeholder="Enter your email..." />
        <InputLabel sx={inputLabelStyle}>
          Password
        </InputLabel>
        <Input value={password} onChange={handleChangePsw} type="password" name="password" sx={inputStyle} placeholder="Choose a password..." />
        <Typography sx={{ fontSize: '0.55em', width: '100%' }} mb={2} paragraph>Password should contain both letter (1 uppercase) and 2 numbers, with minimum length of 8 characters</Typography>
        <ReCAPTCHA
          sitekey="6Lc6KtsiAAAAAKEFZgRlgAjMLHtTKPEepN0DJabW"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={captchaOnChange}
        />
        <Button sx={{ width: '100%', marginTop: '1em' }} type="submit" variant="contained" disabled={!verify}>
          CREATE AN ACCOUNT
        </Button>
        <Typography sx={{ fontSize: '0.5em', width: '100%' }} mb={2} align="center" paragraph>By proceeding, you agree our Terms of Use & Privacy Policy up</Typography>

      </Box>
    </Modal>
  );
}
ModalSubscribe.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpenLogin: PropTypes.func.isRequired,
  handleOpenReceveilMail: PropTypes.func.isRequired,
};

export default ModalSubscribe;
