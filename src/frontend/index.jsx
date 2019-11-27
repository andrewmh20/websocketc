import React from 'react';
import ReactDOM from 'react-dom'

import Routing from './components/Routing'


// import 'bootstrap/dist/css/bootstrap.min.css';

//TODO: Should this folder actually be source? Not public?

//TODO: Register Service worker?




document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routing/>, document.getElementById('root'));
})


