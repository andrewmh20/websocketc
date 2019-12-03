
import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
  
import WSTerminal from './WSTerminal';
import WSContainer from './WSContainer';
import App from './App'
import LoginContainer from './LoginContainer';
import NotFound from './NotFound.jsx'
import NotAuthorized from './NotAuthorized.jsx'

  
class Routing extends React.Component {

  render() {


    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/welcome" component={LoginContainer} />
          <Route exact path="/console" component={WSContainer} />
          <Route exact path="/terminal" component={WSTerminal} />
          {/* TODO: Make terminal not accesible from here by passing prop if was redirected or not */}
          <Route exact path='/NotFound' component={NotFound} />
          <Route exact path='/NotAuthorized' component={NotAuthorized} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      
    )
  }  

}

export default Routing;