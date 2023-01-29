import React from 'react';
import './index.scss';
import logoChantier from '../../../assets/chantier.png';

function About() {
  return (
    <div className="about">
      <img className="about-logo-chantier" src={logoChantier} alt="logo chantier" />
      <p className="about-text">
        Site en construction. Ce site est une démo à titre pédagogique.
        <br />
        Work in progress, this website is a demo for educational purposes.
      </p>
      {/*       <p className="about-text-rights">© 2022 UniMetrix. All rights reserved</p>
 */}
      {' '}

    </div>
  );
}

export default About;
