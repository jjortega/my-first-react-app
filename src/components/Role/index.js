import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Or a simple function
const Role = ({ name, members, onClickMember }) => (
  <div className="Role">
    { members.length } { name.slice(0, -1).toUpperCase() }{ name.slice(-1) }:
    { members.length === 0 ? <em> No one!!!</em> : null }
    { members.length === 1 ? <em> Warning!!! Alone!</em> : null }
    <ul>
      { members.map(member => <li onClick={() => onClickMember(member)} key={member}>{ member }</li>) }
    </ul>
  </div>
);

Role.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  onClickMember: PropTypes.func,
};

Role.defaultProps = {
  members: [],
  onClickMember: () => {},
};

export default Role;


