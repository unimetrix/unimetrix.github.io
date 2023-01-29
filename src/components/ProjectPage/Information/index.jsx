import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { urlState } from '../../../atome/atome';

import './index.scss';

function Information() {
  const [url] = useRecoilState(urlState);
  const [project, setProject] = useState({});
  const { id } = useParams();

  async function getProject(projectId) {
    const res = await axios(`${url}/projects/${projectId}`);
    setProject(res.data);
  }

  useEffect(() => {
    getProject(+id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="information">
      <h1 className="information__title">
        Project information
      </h1>
      {Object.keys(project).length && (
        <ul className="information__list">
          <li className="information__item">
            Contracts:
            <ul className="information__sub-list">
              <li className="information__sub-item" key={project.id}>
                <a
                  className="information__item--link"
                  href={`https://starkscan.co/contract/${project.address}`}
                  alt="contract external link"
                >
                  {project.address}
                </a>
              </li>
            </ul>
          </li>
          <li className="information__item">
            {`Total Supply  : ${project.totalSupply}`}
          </li>
        </ul>
      )}
    </div>
  );
}

Information.propTypes = {};
export default Information;
