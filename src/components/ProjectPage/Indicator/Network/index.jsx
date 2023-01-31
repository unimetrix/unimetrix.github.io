import { useRecoilState } from 'recoil';
import React, {
  useRef, useState, useEffect, useMemo,
} from 'react';
import { Network as VisNetwork } from 'vis-network/standalone/umd/vis-network.min';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Color from 'colorjs.io';
import { urlState } from '../../../../atome/atome';
import './index.scss';

function Network() {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes] = useState([]);
  const [infos, setInfos] = useState([]);
  const [url] = useRecoilState(urlState);
  const { id } = useParams();

  const colors = new Color('#A048FE').range('#83DA90', {
    space: 'lch',
    outputSpace: 'srgb',
  });

  async function getNodes(projectId) {
    const res = await axios(`${url}/projects/${projectId}/tokens`);
    const owners = res.data.tokens.map((token) => token.owner);
    const uniques = owners.filter((owner, index) => owners.indexOf(owner) === index);
    const values = uniques.map((unique) => owners.filter((owner) => owner === unique).length);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const amp = max - min;
    const data = uniques.map((owner, index) => ({
      color: colors((values[index] - min) / amp).toString({ format: 'hex' }),
      label: `${values[index]}`,
      value: values[index],
      title: owner,
      id: owner,
    }));
    setNodes(data);

    setInfos([
      { label: 'Unique owners', value: uniques.length },
      { label: 'Max owned', value: Math.max(...values) },
    ]);
  }

  useEffect(() => {
    getNodes(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const option = useMemo(() => (
    {
      interaction: { hover: true, dragView: true },
      autoResize: true,
      height: '500px',
      width: '100%',
      locale: 'en',
      edges: {
        color: '#411811',
      },
      nodes: {
        shape: 'dot',
        font: {
          color: 'black',
        },
      },
    }
  ), []);

  const visJsRef = useRef(null);

  useEffect(() => {
    const network = visJsRef.current && new VisNetwork(
      visJsRef.current,
      { nodes },
      option,
    );
    network?.on('selectNode', (event) => {
      if (event.nodes?.length === 1) {
        window.location.replace(`https://starkscan.co/contract/${event.nodes[0]}`);
      }
    });
    network.on('hoverNode', () => {
      network.canvas.body.container.style.cursor = 'pointer';
    });
    network.on('blurNode', () => {
      network.canvas.body.container.style.cursor = 'default';
    });
  }, [visJsRef, nodes, option]);

  return (
    <div>
      {nodes.length ? (
        <div className="indicator">
          <h4 className="indicator__title">Distribution</h4>
          <div className="network">
            <div className="network__info">
              {infos.length && (
              <>
                <h1 className="network__info__title">Metrics</h1>
                <div className="network__info__container">
                  <ul className="network__info__list network__info__list--labels">
                    {infos.map((info) => (
                      <li className="network__info__item" key={info.label}>{`${info.label}:`}</li>
                    ))}
                  </ul>
                  <ul className="network__info__list network__info__list--values">
                    {infos.map((info) => (
                      <li className="network__info__item" key={info.label}>{`${info.value}`}</li>
                    ))}
                  </ul>
                </div>
              </>
              )}
            </div>
            <div className="network__graph" ref={visJsRef} />
          </div>
        </div>
      ) : (
        <div className="indicator" style={{ display: 'none' }}>
          <div className="network__graph" ref={visJsRef} />
        </div>
      )}
    </div>
  );
}

export default React.memo(Network);
