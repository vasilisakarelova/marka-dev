import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import db from './testdb.js';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
fetch('https://marka.moscow/admin/api')
  .then((response) => {
    if (response.status >= 400) {
      throw new Error("Bad response from server")
    }
    return response.json()
  })
  .then((data) => {
    ReactDOM.render(<App data={data} />, document.getElementById('root'));
  })
*/
ReactDOM.render(<App data={db} />, document.getElementById('root'));

registerServiceWorker();
