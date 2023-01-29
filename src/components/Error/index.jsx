import React from 'react';

import sbf from './trollface.png';
import './index.scss';

/* Shiba Inu animation source: https://codepen.io/jsmask/pen/qBbymPB */
function Error() {
  return (
    <div className="main">
      <h1 className="main__title">
        404 - Not found
      </h1>
      <div id="my-dog">
        <div className="ears" />
        <div className="face" />
        <div className="brows" />
        <div className="eye left" />
        <div className="eye right" />
        <div className="mouth">
          <span className="left" />
          <span className="right" />
          <p className="tongue" />
        </div>
        <div className="nose" />
        <div className="blush" />
      </div>
      <p className="main__message">
        Sorry, the resource you are looking for has been stored into FTX.
        <br />
        Since withdrawals are locked, you can read some of SBF&apos;s most famous  lies.
      </p>
      <div className="main__quote">
        <img className="main__quote-image" src={sbf} alt="" />
        <q className="main__quote-message">
          “A competitor is trying to go after us with false rumors.
          <br />
          {'FTX is fine. Assets are fine.“ - '}
          <span>SBF, the Nov 07, 2022</span>
        </q>
      </div>
    </div>
  );
}

export default React.memo(Error);
