import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'

// import 'bootstrap/dist/css/bootstrap.min.css';

//TODO: Should this folder actually be source? Not public?

//TODO: Register Service worker?

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
})


