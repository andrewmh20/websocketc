import React from 'react'
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom';

class NotFound extends React.Component {

  constructor(props) {
    super(props);
    this.state = {redir: false}
  }

  render() {
    let page = <div/>
    if (this.state.redir) {
      page = <Redirect to={{
        pathname: '/',
      }} />

    } else {
      page = <div>
        <h1 id='not-found'>THIS ROUTE WAS NOT FOUND (404)</h1>
        <Button onClick={() => this.setState({redir: true})} size='lg'>Return to Home</Button> 
      </div>

    }

    return (
      page
    )

  }
}
export default NotFound;

