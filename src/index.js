import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from './App';

ReactDOM.hydrate(<App />, document.getElementById('root'));


export default () => {
  return ReactDOMServer.renderToString(<App />);
}
