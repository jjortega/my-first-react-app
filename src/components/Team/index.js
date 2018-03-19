import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Role from '../Role';

const roles = ['pms', 'pds', 'devs'];

// A component can be a class
class Teams extends PureComponent {
  render() {
    const {
      name,
      ...props,
    } = this.props;
    const total = roles
                  .map(role => props[role].length)
                  .reduce((a, b) => a+b, 0);

    return (
      <div className="Team">
        Team-{name} has a total of { total } members:
        { roles.map(role =>
          <Role
            name={role}
            members={props[role]}
          />
        ) }
      </div>
    );
  }
}

Teams.propTypes = {
  name: PropTypes.string.isRequired,
  pms: PropTypes.arrayOf(PropTypes.string),
  pds: PropTypes.arrayOf(PropTypes.string),
  devs: PropTypes.arrayOf(PropTypes.string),
};

Teams.defaultProps = {
  pms: [],
  pds: [],
  devs: [],
};

export default Teams;

