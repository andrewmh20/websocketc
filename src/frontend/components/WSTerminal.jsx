/* eslint-disable react/prop-types */
import React from 'react'
import { animateScroll } from 'react-scroll';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class WSTerminal extends React.Component {


  constructor(props) {
    super(props);

    this.isAuthenticated.bind(this);
    if(!this?.props?.location?.state?.appState){
      return;
    }
    this.routeProps = this.props.location
    this.state = { wsText: '', autoscroll: true, activeWS: null, error: null, appState: null };
    this.state.activeWS = this.routeProps.state.activeWS;

    this.state.appState = this.routeProps.state.appState;

    this.ws = null;
    this.createWS = this.createWS.bind(this);

    this.closeWS = this.closeWS.bind(this);

    // this.termRef = React.createRef();
    // console.log(this.state.appState.wsData)



  }
  isAuthenticated(){
    console.log('AUTH: ' + this?.state?.appState?.user)
    return this?.state?.appState?.user;

  }
  componentDidMount() {
    // try {
      if(this.isAuthenticated()){
        this.createWS(this.state.activeWS);

      }
    // } catch (err) {
    // console.log(err);
    // this.routeProps.handlers.handleDisconnect(err);
    // this.state.activeWS = null;
    // this.state.error = err;
    // this.handleDisconnect(err);
    // }
  }

  render() {

    if(!this.isAuthenticated()){
      console.log(!this.isAuthenticated())
      return (
        <Redirect to='/NotAuthorized' />
      )
    }


    //TODO: Move this to CSS?
    else if (!this.state.activeWS) {
      console.log('rednering')
      // console.log('WST appState:' + this.state.appState);
      return (
        <Redirect to={{
          pathname: '/console',
          state: {
            activeWS: this.state.activeWS,
            error: this.state.error,
            appState: this.state.appState
          }
        }} />
      )
    } else {
      let terminalClass = 'float-left'
      if (this.state.autoscroll) {
        terminalClass += ' autoScroll'
      }
      return (
        <Container fluid id='WS-terminal'>
          <Row>
            
            <Col>
              <Container id='terminal' className={terminalClass}>
                {this.state.wsText}
              </Container>
            </Col>
            <Col md='auto'>

              {/* <Form>
          <Form.Control type = ''/> */}
              {/* <Form.Check
                type='checkbox'
                id='autoscroll'
                label='Auto Scroll'
                checked={this.state.autoscroll}
                onChange={() => this.setState({ autoscroll: !this.state.autoscroll })}
              /> */}
              {/* </Form> */}
              {/*TODO: Handle better than disconnect*/}
              <Button variant='danger' onClick={() => this.closeWS()}>Close WSocket</Button>
            </Col>
          </Row>
        </Container>)
    }
  }

  componentDidUpdate() {
    
    // console.log(this.state.autoscroll)
    if (this.isAuthenticated() && this.state.autoscroll) {
      // this.scrollToBottom();
      // this.termRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

    }


  }

  componentWillUnmount() {
    if(this.isAuthenticated()){
    console.log(this.state.error);
    this.closeWS
    // this.handleDisconnect({reason: 'Back Button'});
    }
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'terminal'
    });
  }

  createWS(address) {
    try {
      this.ws = new WebSocket(address);

    } catch (err) {
      this.setState({ activeWS: null, error: new Error('Unable to open Socket. Check your spelling?\n' + err.message) })
      return;
    }
  

    this.ws.onmessage = (event) => {
      let data = this.state.wsText;
      data = data + event.data + '\r\n';
      this.setState({ wsText: data });
      // console.log(this.state);

    };

    // this.ws.onerror = (event) => {
    //   console.log('Bad URL:' + event)
    //   console.log( (event.code) ? event.code : 'A');
    //   this.handleDisconnect('Error Code: ' + ((event.code) ? event.code : ''));
    // }
    this.ws.onclose = (event) => {
      //TODO: Handle This
      console.log('Closed: ' + event);
      console.log(event);
      //Make this diff from error-just disconnect
      // this.routeProps.handlers.handleDisconnect(event);
      if (event.wasClean) {
        this.handleDisconnect(null);
      } else {
        console.log('Imade it here')
        console.log('Error Code: ' + ((event.code) ? event.code : ''))


        this.handleDisconnect('Error Code: ' + ((event.code) ? event.code : ''));
        
      }
      // this.handleDisconnect(event);
    }

  }
  closeWS() {
    this.ws.close();
    // this.routeProps.handlers.handleDisconnect({message: 'Closed on Purpose'});
    // this.handleDisconnect(new Error('Closed on Purpose'));
  }

  handleDisconnect(message) {
    console.log(message)
    if (message) {
      console.log('Now hereII')

      this.setState({ activeWS: null, error: new Error(message) })

    } else {
      console.log('Now hereEE')

      this.setState({ activeWS: null, error: null })

    }

    //TODO Be more descriptive
  }




}


export default WSTerminal;