const CORS_ENDPOINT = 'http://cors.cancamusa.org/';
const CORS_AUTH = 'Basic b250cnVjazpPblRydWNrT2Zmc2l0ZTY2Ng==';

const get = (url) => (
  fetch(CORS_ENDPOINT + url, { headers: new Headers({ 'Authorization': CORS_AUTH }) })
  .then(result => result.json())
);

export {
  get,
};

