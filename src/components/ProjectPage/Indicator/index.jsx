import React from 'react';
import Network from './Network';
import Transfer from './Transfer';
import Mint from './Mint';
import './index.scss';

function Indicator() {
  return (
    <>
      <Network />
      <Transfer />
      <Mint />
    </>
  );
}

Indicator.propTypes = {
};

export default Indicator;
