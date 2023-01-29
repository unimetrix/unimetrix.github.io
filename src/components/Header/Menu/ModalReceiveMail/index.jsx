/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import iconEmail from '../../../../assets/e-mail.png';
import './index.scss';

const formStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

function ModalReceiveMail({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={formStyle}>
        <div>
          <img className="receive-mail--iconEmail" src={iconEmail} alt="icon email" />
        </div>
        <Typography
          sx={{
            textAlign: 'center', marginTop: '0.5rem', color: 'black', fontSize: '1rem',
          }}
          variant="h6"
        >
          We just sent you an email with a validation link

        </Typography>

      </Box>
    </Modal>
  );
}
ModalReceiveMail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default ModalReceiveMail;
