/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Skeleton } from '@mui/material';
import './index.scss';
import Indicator from './Indicator';
import Information from './Information';
import { urlState } from '../../atome/atome';
import Project from '../Home/Projects/Project';
import Transaction from './transactions';

function ProjectPage() {
  // eslint-disable-next-line no-unused-vars
  const [url] = useRecoilState(urlState);
  const [project, setProject] = useState({});
  const { id } = useParams();

  async function getProject(projectId) {
    const res = await axios(`${url}/projects/${projectId}`);
    setProject(res.data);
  }

  useEffect(() => {
    getProject(id);
  }, [id]);

  return (
    <div className="project__page">
      {Object.keys(project).length ? (
        <div className="project__container">
          <div className="project__section">
            <Project
              id={project.id}
              image={`https://carbonable.infura-ipfs.io/${project.Uri.data.image.replace(':/', '')}`}
              name={project.Uri.data.name}
              description={project.Uri.data.descirption}
              dynamic={false}
            />
            <Information />
          </div>
          <Indicator />
          <Transaction />
        </div>
      ) : (
        <div className="project__container">
          <div className="project__section">
            <div>
              <Skeleton variant="text" width="20rem" height="4rem" sx={{ margin: '1rem' }} />
              <Skeleton variant="string" width="20rem" height="10rem" sx={{ margin: '1rem' }} />
              <Skeleton variant="text" width="20rem" height="4rem" sx={{ margin: '1rem' }} />
            </div>
            <div>
              <Skeleton variant="text" width="20rem" height="4rem" sx={{ margin: '1rem' }} />
              <Skeleton variant="string" width="20rem" height="14rem" sx={{ margin: '1rem' }} />
            </div>
          </div>
          <div>
            <Skeleton variant="text" height="4rem" sx={{ margin: '1rem' }} />
            <Skeleton variant="string" height="15rem" sx={{ margin: '1rem' }} />
          </div>
        </div>
      )}
    </div>
  );
}

ProjectPage.propTypes = {
};

export default ProjectPage;
