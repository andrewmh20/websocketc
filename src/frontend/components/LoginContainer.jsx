import React from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import {Redirect} from 'react-router-dom';
class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props)
    if (this?.props?.location?.state) {
      this.state = {user: this.props.location.state.user, wsData: this.props.location.state.wsData, redir: false, direct: false}

    } else {
      this.state = {user: null, wsData: null, redir: false, direct: true}

    }
  }

  // componentDidMount() {
  //   // if(this.isAuthenticated()){
  //   axios.get('/api/getUserData').then(res => {
  //     this.setState(res.data);
  //     this.setState({ ready: true })
  //   },
  //   err => {
  //     console.log('AXIOS ERROR' + err);
  //   });
  // // }
  // }


  render() {
    let page = <div/>
console.log(this.state)
    if(this.state.direct){
      page = <Redirect to={{pathname:'/'}}/>
    }
    else{
    if (this.state.redir) {
      page = <Redirect to={{
        pathname: '/console',
        state: {
          appState: {error: null, activeWS: null, wsData:this.state.wsData, user:this.state.user},
          activeWS: null,
          error: null
        }
      }} />

    } else {
      // if (this.state.ready) {
      if (this.state.user) {
        console.log(this.state)
        page = <div className = 'text-center' id='login'>
          <Jumbotron>
            <h1>Welcome to Websocketc {this.state.user}!</h1>
            <h2>Click Below to continue to the site with your Current Google Session</h2>
            <Button onClick={() => this.setState({redir: true})} size='lg'>Continue</Button> 
            {/* <br/> */}
            <h2>or</h2>  
            {/* <br/> */}
            <Button variant='warning' href= '/auth/logout' size='lg'>Logout</Button>
          </Jumbotron>
        </div>
      } else {
        page = <div className = 'text-center' id='login'>
          <Jumbotron>
            <h1>Welcome to Websocketc!</h1>
            <h2>Click Below to login with your Google Account</h2>
            <Button href = '/auth/login' size='lg'>Login</Button>
          </Jumbotron>
        </div>
      }
      // }

    }
  }
    // this.state.ready ? 
    //   <div className = 'text-center' id='login'>
    //     <Jumbotron>
    //       <h1>Welcome to Websocketc!</h1>
    //       <h2>Click Below to login with your Google Account</h2>
    //       <Button href = '/auth/login' size='lg'>Login</Button>
    //     </Jumbotron>
    //   </div> : <div></div>

    // console.log(this?.state?.user);
    return (
      page
    )
  }
    
}

// LoginContainer.defaultProps = {
//   // test:'hi',
//   location: {
//     state: {
//       user: null,
//       wsData: null
//       // redir: false
//     }
//   }

// }

export default LoginContainer;