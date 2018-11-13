import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import db from './testdb.js';

import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App data={db} />, document.getElementById('root'));

registerServiceWorker();
