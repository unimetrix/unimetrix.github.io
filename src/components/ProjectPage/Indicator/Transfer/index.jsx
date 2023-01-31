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

function Transfer() {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [url] = useRecoilState(urlState);
  const { id } = useParams();

  const colors = new Color('#A048FE').range('#83DA90', {
    space: 'lch',
    outputSpace: 'srgb',
  });

  async function getNodes(projectId) {
    let counter = 0;

    const transfers = await axios(`${url}/projects/${projectId}/transfers`);

    const rawSenders = transfers.data.map((transfer) => transfer.from);
    const uniqueSenders = rawSenders.filter(
      (sender, index) => rawSenders.indexOf(sender) === index,
    );
    const senders = uniqueSenders.map(
      (sender) => ({ sender, count: rawSenders.filter((item) => item === sender).length }),
    );

    const rawReceivers = transfers.data.map((transfer) => transfer.to);
    const uniqueReceivers = rawReceivers.filter(
      (receiver, index) => rawReceivers.indexOf(receiver) === index,
    );
    const receivers = uniqueReceivers.map(
      (receiver) => ({ receiver, count: rawReceivers.filter((item) => item === receiver).length }),
    );

    const rawEdges = transfers.data.map((tx) => ({ sender: tx.from, receiver: tx.to }));
    const uniquesEdges = [
      ...new Map(rawEdges.map((item) => [item.sender + item.receiver, item])).values(),
    ];
    const resEdges = uniquesEdges.map(
      (edge) => (
        {
          ...edge,
          count: rawEdges.filter(
            (item) => (item.sender === edge.sender) && (item.receiver === edge.receiver),
          ).length,
        }
      ),
    );

    const minter = rawSenders.find((sender) => parseInt(sender, 16) === 0);

    const dataNodes = {};

    // Add senders to nodes
    senders.forEach((node) => {
      counter += 1;

      dataNodes[node.sender] = {
        label: `${node.count}`,
        value: node.count,
        title: node.sender,
        id: counter,
        difference: 0,
      };
    });

    receivers.forEach((node) => {
      if (!dataNodes[node.receiver]) {
        counter += 1;

        dataNodes[node.receiver] = {
          label: `${node.count}`,
          value: node.count,
          title: node.receiver,
          id: counter,
          difference: node.count,
        };
      } else if (node.receiver !== minter) {
        dataNodes[node.receiver].difference = node.count - dataNodes[node.receiver].value;
        dataNodes[node.receiver].value = node.count;
        dataNodes[node.receiver].label = `${node.count}`;
      } else {
        dataNodes[node.receiver].difference = 0;
      }
    });

    const amp = Math.max(...Object.values(dataNodes).map((node) => node.difference));
    setNodes(Object.values(dataNodes).map((node) => {
      const value = node.difference / amp;
      const color = value ? colors(value).toString({ format: 'hex' }) : '#CCCCCC';
      return { ...node, color };
    }));

    const ampEdge = Math.max(...Object.values(resEdges).map((edge) => edge.count));
    const dataEdges = resEdges.map((edge) => {
      const color = colors(edge.count / ampEdge).toString({ format: 'hex' });
      return ({
        from: dataNodes[edge.sender].id,
        to: dataNodes[edge.receiver].id,
        value: edge.count,
        color,
      });
    });
    setEdges(dataEdges);
  }

  useEffect(() => {
    getNodes(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const options = useMemo(() => (
    {
      autoResize: true,
      height: '500px',
      width: '100%',
      locale: 'en',
      layout: { improvedLayout: false },
      nodes: {
        shape: 'dot',
        font: {
          color: 'black',
        },
        scaling: {
          min: 10,
          max: 80,
        },
        borderWidth: 2,
      },
      interaction: {
        hover: false,
        hideEdgesOnDrag: false,
        tooltipDelay: 200,
        dragView: true,
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -10000,
        },
      },
    }
  ), []);

  const visJsRef = useRef(null);

  useEffect(() => {
    const network = visJsRef.current && new VisNetwork(
      visJsRef.current,
      { nodes, edges },
      options,
    );
    network.on('blurNode', () => {
      network.canvas.body.container.style.cursor = 'default';
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visJsRef, nodes, edges, options]);

  return (
    <div>
      {nodes.length ? (
        <div className="indicator">
          <h4 className="indicator__title">Transfers</h4>
          <div className="transfer" ref={visJsRef} />
        </div>
      ) : (
        <div className="indicator" style={{ display: 'none' }}>
          <div className="transfer" ref={visJsRef} />
        </div>
      )}
    </div>
  );
}

export default React.memo(Transfer);
