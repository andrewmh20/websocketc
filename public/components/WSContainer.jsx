import React from 'react'

class WSContainer extends React.Component {

  
  constructor() {
    super();
    
    this.state = {wsData: ''};
    this.address = 'ws://localhost:8080/';

    this.createWS = this.createWS.bind(this);

    this.createWS(this.address);

  }

  render() {
    //TODO: Move this to CSS?
    return (<div style={{whiteSpace: 'pre-wrap' , 
      overflow: 'scroll', height: '120px', width: '240px'}}>
      <p>
        {this.state.wsData}
      </p>
    </div>)
  }

  createWS(address) {
    const ws = new WebSocket(address);
    
    ws.onmessage = (event) => {
      let data = this.state.wsData;
      data = data + event.data + '\r\n';
      this.setState({wsData: data});
      // console.log(this.state);

    };

    ws.onclose = (event) => {
      //TODO: Handle This
      console.log(event);
    }

  }
}


export default WSContainer;