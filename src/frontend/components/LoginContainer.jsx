import React from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class LoginContainer extends React.Component {

  render() {
    return (
      <div className = 'text-center' id='login'>
        <Jumbotron>
          <h1>Welcome to Websocketc!</h1>
          <h2>Click Below to login with your Google Account</h2>
          <Button href = '/auth/login' size='lg'>Login</Button>
        </Jumbotron>
      </div>
    )
  }
    
}

export default LoginContainer;