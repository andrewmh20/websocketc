import React from 'react'
import Button from 'react-bootstrap/Button'
class NotFound extends React.Component {

  render() {
    return (
      <div>
        <h1 id='not-found'>YOU ARE NOT AUTHORIZED (403)</h1>
        <Button href = '/auth/login' size='lg'>Login</Button>
      </div>
    )

  }

}

export default NotFound;