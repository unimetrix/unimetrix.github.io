import React, { useState, useEffect } from 'react';
import './index.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { urlState } from '../../../atome/atome';

function Selection() {
  const [open, setOpen] = useState(false);
  const [dataProjects, setDataProjects] = useState([]);
  const [project, setProject] = useState('');
  const [url] = useRecoilState(urlState);
  const location = useLocation();

  async function getDataProjects() {
    const res = await axios(`${url}/projects`);
    setDataProjects(res.data);
  }

  const style = {
    color: 'black',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
  };

  useEffect(() => {
    getDataProjects();
    setProject('');
    setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (location.pathname === '/') {
      setProject('');
    }
  }, [location]);

  const handleChange = (event) => {
    event.preventDefault();
    setProject(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="select">
      <FormControl sx={{ display: 'flex', justifyContent: 'space-between', width: 300 }}>
        <InputLabel id="select-label">Select project</InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select"
          label="Select project"
          sx={style}
          value={project}
          onChange={handleChange}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {
          dataProjects.map(({ id, Uri }) => (
            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} key={id} component={NavLink} to={`project/${id}`} value={Uri.data.name}>
              <div className="select-item">
                <p className="select-item--name">{Uri.data.name}</p>
              </div>
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
    </div>
  );
}
export default Selection;
