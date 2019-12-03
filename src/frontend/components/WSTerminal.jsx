/* eslint-disable react/prop-types */
import React from 'react'
import { animateScroll } from 'react-scroll';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FileSaver from 'file-saver'
import axios from 'axios'

class WSTerminal extends React.Component {


  constructor(props) {
    super(props);

    this.isAuthenticated.bind(this);
    if (!this ?.props ?.location ?.state ?.appState) {
      return;
    }
    this.routeProps = this.props.location
    this.state = { wsText: '', autoscroll: true, activeWS: null, error: null, appState: null, connected: false };
    this.state.activeWS = this.routeProps.state.activeWS;

    this.state.appState = this.routeProps.state.appState;

    this.ws = null;
    this.createWS = this.createWS.bind(this);

    this.closeWS = this.closeWS.bind(this);




  }
  isAuthenticated() {
    return this ?.state ?.appState ?.user;

  }
  componentDidMount() {
    if (this.isAuthenticated()) {
      this.createWS(this.state.activeWS);

    }

  }

  render() {

    if (!this.isAuthenticated()) {
      return (
        <Redirect to='/NotAuthorized' />
      )
    }


    else if (!this.state.activeWS) {
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
      return (this.state.connected ?
        <Container fluid id='WS-terminal'>
          <Row>

            <Col>
              <Container id='terminal' className={terminalClass}>
                {this.state.wsText}
              </Container>
            </Col>
            <Col md='auto'>

              <Row>

                <Button variant='danger' onClick={() => this.closeWS()}>Close WSocket</Button>
              </Row>
              <Row>

                <Button variant='info' onClick={() => this.downloadText(new Date())}> Download</Button>
              </Row>
              <Row>

                <Button variant='info' onClick={() => this.saveText(new Date())}> Save </Button>
              </Row>
              <Row>

                <Button variant='info' onClick={() => {
                  const date = new Date();
                  this.saveText(date);
                  this.downloadText(date)
                }
                }> Save &amp; Download </Button>
              </Row>

            </Col>
          </Row>
        </Container> : <div />)
    }
  }
  saveText(date) {
    const tempArr = this.state.appState.wsData;
    let index = -1;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].url === this.state.activeWS) {
        index = i;
      }
    }
    tempArr[index].saved.push({ fileName: date.toISOString(), time: date.toLocaleString(), text: this.state.wsText });

    axios.post('/api/updateWSHosts', { user: this.state.user, wsData: tempArr })
      .then(res => {
        this.setState({ appState: res.data });
      }

      )


  }

  downloadText(date) {
    {
      const toDownload = new Blob([this.state.wsText], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(toDownload, date.toISOString() + '.txt');
    }
  }




  componentWillUnmount() {
    if (this.isAuthenticated()) {
      this.closeWS
    }
  }


  createWS(address) {
    try {
      this.ws = new WebSocket(address);
    } catch (err) {
      this.setState({ activeWS: null, error: new Error('Unable to open Socket. Check your spelling?\n' + err.message) })
      return;
    }

    this.ws.onopen = () => {
      this.setState({ connected: true });

    }
    this.ws.onmessage = (event) => {
      let data = this.state.wsText;
      data = data + event.data + '\r\n';
      this.setState({ wsText: data });

    };

    this.ws.onclose = (event) => {
      this.setState({ connected: false });

      if (event.wasClean) {
        this.handleDisconnect(null);
      } else {

        this.handleDisconnect('Error Code: ' + ((event.code) ? event.code : ''));

      }
    }

  }
  closeWS() {
    this.ws.close();
  }

  handleDisconnect(message) {
    if (message) {

      this.setState({ activeWS: null, error: new Error(message) })

    } else {

      this.setState({ activeWS: null, error: null })

    }

  }




}


export default WSTerminal;