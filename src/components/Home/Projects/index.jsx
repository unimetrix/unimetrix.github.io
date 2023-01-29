/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames';
import { Skeleton } from '@mui/material';

import Project from './Project';

import './index.scss';

function LeftArrow({ style, onClick }) {
  return (
    <div
      className={classNames('slick-arrow', 'slick-arrow--left')}
      style={style}
      onClick={onClick}
    />
  );
}

function RightArrow({ style, onClick }) {
  return (
    <div
      className={classNames('slick-arrow', 'slick-arrow--right')}
      style={style}
      onClick={onClick}
    />
  );
}

function Projects({ title, projects }) {
  const settings = {
    className: 'projects',
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={`container container--${title.toLowerCase()}`}>
      <h2 className="container--title">{title}</h2>
      {projects.length ? (
        <Slider {...settings}>
          {projects.map((project) => (
            <div className="project-slide" key={project.id}>
              <Project
                id={project.id}
                image={`https://carbonable.infura-ipfs.io/${project.Uri.data.image.replace(':/', '')}`}
                name={project.Uri.data.name}
                description={project.Uri.data.descirption}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          {[...Array(5).keys()].map((index) => (
            <div className="project-slide" key={index}>
              <Skeleton variant="text" height="4rem" sx={{ margin: '1rem auto', maxWidth: '20rem' }} />
              <Skeleton variant="string" height="10rem" sx={{ margin: '1rem auto', maxWidth: '20rem' }} />
              <Skeleton variant="text" height="4rem" sx={{ margin: '1rem auto', maxWidth: '20rem' }} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

Projects.propTypes = {
  title: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default React.memo(Projects);
