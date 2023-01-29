import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { InputLabel, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import passwordValidate from 'password-validator';
import { useNavigate, useParams } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { connectedState, urlState, userState } from '../../atome/atome';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setUser] = useRecoilState(userState);
  const [url] = useRecoilState(urlState);
  const [, setConnected] = useRecoilState(connectedState);
  const navigate = useNavigate();
  const { token } = useParams();
  localStorage.setItem('token', token);
  const tokenLocal = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${tokenLocal}` },
  };

  useEffect(() => {
    setConnected(false);
  }, []);

  const connect = async () => {
    try {
      await axios.post(`${url}/login/reset-password`, { password }, config);
      const userToken = decodeToken(tokenLocal);

      setUser(userToken);
      setConnected(true);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setConnected(false);
    }
  };

  const formStyle = {
    flexGrow: '1',
    width: '30%',
    margin: 'auto',
    marginTop: '4rem',
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

  const handleChangePsw = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // connect et verif comme pour le subscribe
    const pswValidate = schema.validate(password);
    if (!pswValidate) {
      setErrorMessage('Password invalid');
    } else {
      connect();
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <Typography sx={{
        backgroundColor: 'rgb(163 22 22);', textAlign: 'center', borderRadius: '5px', color: 'white;',
      }}
      >
        {errorMessage}
      </Typography>
      <InputLabel sx={inputLabelStyle}>
        Enter your new password
      </InputLabel>
      <Input value={password} onChange={handleChangePsw} type="password" name="password" sx={inputStyle} placeholder="Choose a password..." />
      <Typography sx={{ fontSize: '0.55em', width: '100%' }} mb={2} paragraph>Password should contain both letter (1 uppercase) and 2 numbers, with minimum length of 8 characters</Typography>

      <Button sx={{ width: '100%', marginTop: '0.2em' }} type="submit" variant="contained">
        CHANGE PASSWORD
      </Button>
    </Box>
  );
}

export default NewPassword;
