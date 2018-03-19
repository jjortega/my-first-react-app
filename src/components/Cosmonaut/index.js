import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import './style.css';

const Cosmonaut = ({
  title,
  name,
  biophoto,
  biophotowidth,
  biophotoheight,
  country,
  countryflag,
  location,
  launchdate,
  bio,
  biolink,
  twitter,
}) => (
  <div class="Person" key={name}>
    <img class="Pic" alt="pic" src={biophoto} width={biophotowidth} height={biophotoheight} />
    <div class="Info">
      <div>{ title } { name } from <img title={country} alt={country} class="Flag" src={countryflag} /></div>
      <div>At "{ location }" since { launchdate }</div>
      <div><em>{ bio }</em></div>
      <div class="Links">
        <Link url={biolink} name="Bio" />
        <Link url={twitter} name="Twitter" />
      </div>
    </div>
  </div>
);

Cosmonaut.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  biophoto: PropTypes.string.isRequired,
  biophotowidth: PropTypes.number,
  biophotoheight: PropTypes.number,
  country: PropTypes.string,
  countryflag: PropTypes.string,
  launchdate: PropTypes.string.isRequired,
  careerdates: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
  biolink: PropTypes.string,
  twitter: PropTypes.string,
};

Cosmonaut.defaultProps = {
  title: '',
  biophotowidth: 640,
  biophotoheight: 800,
  country: 'usa',
  countryflag: 'http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg',
  careerdates: 0,
  location: 'Lost in Space',
  bio: '',
  biolink: '',
  twitter: '',
};

export default Cosmonaut;

