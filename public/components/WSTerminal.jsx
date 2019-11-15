import React from 'react'
import { animateScroll } from 'react-scroll';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
class WSTerminal extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {wsText: '', autoscroll: false};

    this.ws = null;
    this.createWS = this.createWS.bind(this);

    this.closeWS = this.closeWS.bind(this);

    // console.log(this.props)

    try {
      this.createWS(this.props.url);
    } catch (err) {
      console.log(err);
      this.props.handleDisconnect(err);
    }

  }
  

  render() {
    //TODO: Move this to CSS?
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

  componentDidUpdate() {
    // console.log(this.state.autoscroll)
    if (this.state.autoscroll) {
      this.scrollToBottom();

    }
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
      this.props.handleDisconnect(event);

    }

  }
  closeWS() {
    this.ws.close();
    this.props.handleDisconnect({message: 'Closed on Purpose'});
  }

 


}


export default WSTerminal;