import React from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    if (this ?.props ?.location ?.state) {
      this.state = { user: this.props.location.state.user, wsData: this.props.location.state.wsData, redir: false, direct: false }

    } else {
      this.state = { user: null, wsData: null, redir: false, direct: true }

    }
  }



  render() {
    let page = <div />
    if (this.state.direct) {
      page = <Redirect to={{ pathname: '/' }} />
    }
    else {
      if (this.state.redir) {
        page = <Redirect to={{
          pathname: '/console',
          state: {
            appState: { error: null, activeWS: null, wsData: this.state.wsData, user: this.state.user },
            activeWS: null,
            error: null
          }
        }} />

      } else {
        if (this.state.user) {
          page = <div className='text-center' id='login'>
            <Jumbotron>
              <h1>Welcome to Websocketc {this.state.user}!</h1>
              <h2>Click Below to continue to the site with your Current Google Session</h2>
              <Button onClick={() => this.setState({ redir: true })} size='lg'>Continue</Button>
              <h2>or</h2>
              <Button variant='warning' href='/auth/logout' size='lg'>Logout</Button>
            </Jumbotron>
          </div>
        } else {
          page = <div className='text-center' id='login'>
            <Jumbotron>
              <h1>Welcome to Websocketc!</h1>
              <h2>Click Below to login with your Google Account</h2>
              <Button href='/auth/login' size='lg'>Login</Button>
              <h2>Websocketc is a website that provides an easy interface between users and their own servers running websocketd.</h2>
              <h3>Check us out on<a href='https://github.com/andrewmh20/websocketc'></a>GitHub for more details!</h3>
            </Jumbotron>
          </div>
        }

      }
    }

    return (
      page
    )
  }

}



export default LoginContainer;