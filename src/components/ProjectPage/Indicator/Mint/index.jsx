import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';

import { urlState } from '../../../../atome/atome';
import './index.scss';

function Mint() {
  // eslint-disable-next-line no-unused-vars
  const [mints, setMints] = useState([]);
  const [infos, setInfos] = useState([]);
  const [url] = useRecoilState(urlState);
  const { id } = useParams();

  async function getMints(projectId) {
    const minters = await axios(`${url}/projects/${projectId}/minters`);
    const minter = minters.data[0];
    const buys = await axios(`${url}/minters/${minter.id}/buys`);
    const airdrops = await axios(`${url}/minters/${minter.id}/airdrops`);
    const txs = [...airdrops.data, ...buys.data];
    const data = txs.map((tx) => ({
      block: Number(tx.block),
      count: Number(tx.quantity),
    }));
    data.sort((p, n) => p - n);

    setMints(data);

    const blocks = data.map((mint) => mint.block);
    const counts = data.map((mint) => mint.count);
    const start = Math.min(...blocks);
    const end = Math.max(...blocks);
    const duration = (end - start + 1);
    setInfos([
      {
        label: 'Mint events',
        value: data.length,
      },
      {
        label: 'Most minted in a single tx',
        value: Math.max(...counts),
      },
      {
        label: 'Less minted in a single tx',
        value: Math.min(...counts),
      },
      {
        label: 'Sold in',
        value: `${duration} blocks`,
      },
    ]);
  }

  useEffect(() => {
    getMints(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const blocks = mints.map((mint) => mint.block);
  const offset = 10;
  const layout = {
    paper_bgcolor: '#00000000',
    plot_bgcolor: '#00000000',
    barmode: 'stack',
    bargap: 0,
    yaxis: { showgrid: false },
    xaxis: { range: [Math.min(...blocks) - offset, Math.max(...blocks) + offset] },
    hoverlabel: {
      bgcolor: '#FFFFFF',
      bordercolor: '#00000000',
      font: {
        color: '#000000',
      },
    },
    margin: { l: 20, r: 20 },
  };
  const settings = {
    hovertemplate: 'Mints: %{y:.d}<extra></extra>',
    // xperiod: window.innerWidth < 600 ? 180e3 : 60e3,
    xperiodalignment: 'middle',
    type: 'bar',
    marker: { color: '#83DA90', line: { color: '#000000', width: 1 } },
  };

  return (
    <div>
      {mints.length ? (
        <div className="indicator">
          <h4 className="indicator__title">Sales</h4>
          <div className="mint">
            <div className="mint__info">
              {infos.length && (
              <>
                <h1 className="mint__info__title">Metrics</h1>
                <div className="mint__info__container">
                  <ul className="mint__info__list mint__info__list--labels">
                    {infos.map((info) => (
                      <li className="mint__info__item" key={info.label}>{`${info.label}:`}</li>
                    ))}
                  </ul>
                  <ul className="mint__info__list mint__info__list--values">
                    {infos.map((info) => (
                      <li className="mint__info__item" key={info.label}>{`${info.value}`}</li>
                    ))}
                  </ul>
                </div>
              </>
              )}
            </div>
            <Plot
              data={[
                {
                  ...settings,
                  x: blocks,
                  y: mints.map((mint) => mint.count),
                },
              ]}
              layout={layout}
              config={{ displayModeBar: false }}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ) : (
        <div className="indicator" style={{ display: 'none' }} />
      )}
    </div>
  );
}

export default React.memo(Mint);
