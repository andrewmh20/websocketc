import React from 'react'


import axios from 'axios';

import { Redirect } from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ready: false };
    axios.get('/api/getUserData').then(res => {
      this.setState({...res.data});
      this.setState({ ready: true })
    },
    err => {
      console.log('AXIOS ERROR' + err);
    });



  }




  render() {

    let startPage = <div></div>

    if (this.state.ready) {
      startPage = <Redirect to={{
        pathname: '/welcome',
        state: {
          user: this.state.user,
          wsData: this.state.wsData
        }
      }
      } />

    }

    return (

      <div>
        {startPage}
      </div>
    )
  }

}


export default App;