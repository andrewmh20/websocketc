/* eslint-disable react/prop-types */
import React from 'react'
import { animateScroll } from 'react-scroll';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

class WSTerminal extends React.Component {

  
  constructor(props) {
    super(props);
    this.routeProps = this.props.location
    this.state = {wsText: '', autoscroll: false, activeWS: null, error: null};
    this.state.activeWS = this.routeProps.state.activeWS;

    this.state.appState = this.routeProps.state.appState;

    this.ws = null;
    this.createWS = this.createWS.bind(this);

    this.closeWS = this.closeWS.bind(this);

    // console.log(this.state.appState.wsData)

   

  }
  
  componentDidMount() {
    try {
      this.createWS(this.state.activeWS);
    } catch (err) {
      console.log(err);
      // this.routeProps.handlers.handleDisconnect(err);
      this.setState({activeWS: null, error: err})
      // this.state.activeWS = null;
      // this.state.error = err;
    // this.handleDisconnect(err);
    }
  }

  render() {
    //TODO: Move this to CSS?
    if (!this.state.activeWS) {
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
      return (
        <div>
          {/* <Form>
          <Form.Control type = ''/> */}
          <Form.Check 
            type='checkbox'
            id= 'autoscroll'
            label='Auto Scroll'
            checked = {this.state.autoscroll}
            onChange = {()=>this.setState({autoscroll: !this.state.autoscroll})}
          />
          {/* </Form> */}
          {/*TODO: Handle better than disconnect*/}
          <Button onClick = {() => this.closeWS() }>Close WSocket</Button>
          <div id='WS-terminal' className= 'terminal'>
            <p>
              {this.state.wsText}
            </p>
          </div>
        </div>)
    }
  }

  componentDidUpdate() {
    // console.log(this.state.autoscroll)
    if (this.state.autoscroll) {
      this.scrollToBottom();

    }
  }
  
  componentWillUnmount() {
    this.closeWS
    // this.handleDisconnect({reason: 'Back Button'});
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'WS-terminal'
    });
  }

  createWS(address) {
    this.ws = new WebSocket(address);
    
    this.ws.onmessage = (event) => {
      let data = this.state.wsText;
      data = data + event.data + '\r\n';
      this.setState({wsText: data});
      // console.log(this.state);

    };

    this.ws.onerror = (event) => {
      console.log('Bad URL:' + event)
    }
    this.ws.onclose = (event) => {
      //TODO: Handle This
      console.log('Closed: ' + event);
      //Make this diff from error-just disconnect
      // this.routeProps.handlers.handleDisconnect(event);
      this.handleDisconnect(event);
    }

  }
  closeWS() {
    this.ws.close();
    // this.routeProps.handlers.handleDisconnect({message: 'Closed on Purpose'});
    // this.handleDisconnect(new Error('Closed on Purpose'));
  }

  handleDisconnect(event) {
    console.log('Here in WsT')
    this.setState({activeWS: null, error: new Error(event.reason)})

    //TODO Be more descriptive
  }

 


}


export default WSTerminal;