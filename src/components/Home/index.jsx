import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {
  urlState,
} from '../../atome/atome';

import Projects from './Projects';

import './index.scss';

function Home() {
  const [trends, setTrends] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [url] = useRecoilState(urlState);

  async function getTrends() {
    const projects = await axios(`${url}/projects`);
    setTrends(projects.data.sort((previous, next) => previous.id - next.id));
  }

  useEffect(() => {
    getTrends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      {trends && (<Projects title="Trends" projects={trends} />)}
    </div>
  );
}

export default React.memo(Home);
