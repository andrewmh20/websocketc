import React from 'react'


import WSContainer from './WSContainer';
import axios from 'axios';
import LoginContainer from './LoginContainer'

import {Redirect} from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ready: false };
    axios.get('/api/getUserData').then(res => {
      this.setState(res.data);
      this.setState({ ready: true })
    },
    err => {
      console.log('AXIOS ERROR' + err);
    });



  }


  //TODO: Can make databse call in WS container only when needed i.e. props not passed


  render() {
    console.log(this.state);

    let startPage = <div></div>

    if (this.state.ready) {
      // startPage = this.state.user ?

      //   <Redirect to={{
      //     pathname: '/console',
      //     state: {
      //       appState: {error: null, activeWS: null, wsData:this.state.wsData, user:this.state.user},
      //       activeWS: null,
      //       error: null
      //     }
      //   }} />
      //   // <WSContainer initState= {this.state} /> 
      //   : 
      startPage = <Redirect to= {{pathname:'/welcome',
        state:{
          user: this.state.user,
          wsData: this.state.wsData
        }
      }
      }/>

    }

    return (

      <div>
        {startPage}
      </div>
    )
  }

}


export default App;