import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'

//TODO: Should this folder actually be source? Not public?

//TODO: Register Service worker?

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
})


