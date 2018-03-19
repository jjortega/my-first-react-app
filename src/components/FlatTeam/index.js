import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Role from '../Role';

// A component can be a class
class FlatTeam extends PureComponent {
  render() {
    const {
      name,
      members,
      onClickMember,
    } = this.props;

    return (
      <div className="Team">
        Team-{name} has a total of { members.length } members:
        <Role
          name={'members'}
          members={members}
          onClickMember={onClickMember}
        />
      </div>
    );
  }
}

FlatTeam.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  onClickMember: PropTypes.func,
};

FlatTeam.defaultProps = {
  members: [],
  onClickMember: () => {},
};

export default FlatTeam;

