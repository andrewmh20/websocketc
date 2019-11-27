/* eslint-disable react/prop-types */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class WSHeader extends React.Component {


  render() {
    return (
      this.props.user ?
        // <div>
        <Container fluid> 
          <Row>
            <Col>
          
              <h1>
          Welcome {this.props.user}!
              </h1>
            </Col>
            <Col>
              <Button variant ='info' className='float-right' href='/auth/logout'>Logout</Button>
            </Col>
          </Row>
        </Container>
        // </div> 
        : 
        <h2>Retrieving User Data...</h2> 
    )
  }
}



export default WSHeader;