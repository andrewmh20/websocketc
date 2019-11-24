import React from 'react'
import WSContainer from './WSContainer';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    axios.get('/api/getUserData').then(res => {
      // console.log(res.data);
      // this.setState({user: res.data.user, wsData: res.data.wsData});
      this.setState(res.data);
      this.setState({ready: true})
    }, 
    err => {
      console.log('AXIOS ERROR' + err);
    });
    
    // {user: null, ready: false};
  }




  
  render() {
    console.log(this.state);

    const startPage = this.state.user && this.state.ready ?
      <WSContainer initState= {this.state} /> 
      : <Button href = '/auth/login'>Login</Button>

    return (
      
      <div>
        {startPage}
      </div>
    )
  }

}


export default App;