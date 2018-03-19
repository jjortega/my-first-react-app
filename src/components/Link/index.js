import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ url, text }) => (
  url ? <a href={url} target="_blank" rel="noopener">{ text }</a> : null
);

Link.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default Link;

