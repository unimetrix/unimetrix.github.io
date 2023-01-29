import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../../../assets/nft.png';

import './index.scss';

function Project({
  id, image, name, description, dynamic,
}) {
  const style = {
    backgroundImage: `url(${image || logo})`,
  };

  return (
    <NavLink
      to={`/project/${id}`}
      end
      draggable="false"
      className={dynamic ? classNames('project', 'project--dynamic') : classNames('project')}
      style={style}
    >
      <h3 className="project--title">{name}</h3>
      {description && (
        <section className="project--description">
          <p>{description}</p>
        </section>
      )}
    </NavLink>
  );
}

Project.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  dynamic: PropTypes.bool,
};

Project.defaultProps = {
  dynamic: true,
  image: logo,
  name: null,
  description: null,
};

export default React.memo(Project);
