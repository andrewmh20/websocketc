import React from 'react'
import WSHeader from './WSHeader';
import WSList from './WSList';
import axios from 'axios';
import WSTerminal from './WSTerminal';
import Alert from 'react-bootstrap/Alert'
import {Redirect} from 'react-router-dom'
import { throws } from 'assert';
import NotAuthorized from './NotAuthorized'
class WSContainer extends React.Component {



  constructor(props) {
    super(props);
    this.isAuthenticated.bind(this);
    if(!this?.props?.location?.state?.appState?.user){
      return;
    }
    this.routeProps = this.props.location;
    // console.log('WSC appState:' + this.routeProps.state.appState);

    //Restore state (WS data, user etc.)
    this.state = this.routeProps.state.appState;

    // this.state = {error: null, activeWS: null, wsData:[{name:null, url:null}], user:null};

    console.log(this.routeProps);

    //Update variable/local state from props
    this.state.error = this.routeProps.state.error;
    this.state.activeWS = this.routeProps.state.activeWS;

    this.props.history.replace('/console', {appState: this.state, error: null}) 

    // this.props.history.replace() 


    // console.log(this.routeProps.state.error);
    // console.log('ACTIVE:' + this.routeProps.state.activeWS);
    // console.log('ACTIVE: State' + this.state.activeWS);
    console.log(this.state);


    // this.state.error = this.routeProps.state.error;
    // this.state.activeWS = this.routeProps.state.activeWS;
    
    //{user: null, wsData: [], activeWS: null, error: null}
    // console.log(this.state);

    this.handleConnect = this.handleConnect.bind(this);
    // this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);



  }

  isAuthenticated(){
    // console.log('AUTH: ' + this?.state?.appState?.user)
    return this?.state?.user;

  }


  componentDidMount() {
    // if(this.isAuthenticated()){
  //   axios.get('/api/getUserData').then(res => {
  //     this.setState(res.data);
  //     // this.setState({ ready: true })
  //   },
  //   err => {
  //     console.log('AXIOS ERROR' + err);
  //   });
  // // }
  }

  //Maybe move this logic out of render and store in field?

  render() {
    if (!this.isAuthenticated()) {
      return (
        <Redirect to='/NotAuthorized' />
      )
    }

    else if (this.state.activeWS) {
      console.log('ACTIVE in Render:' + this.state.activeWS);

      console.log('REDNER1');

      return (<Redirect push to={{
        pathname: '/terminal',
        // handlers: {
        //   handleDisconnect: this.handleDisconnect

        // },
        state: {
          activeWS: this.state.activeWS,
          appState: this.state   

        }
      }} />)
      // return <WSTerminal url = {this.state.activeWS} handleDisconnect = {this.handleDisconnect}></WSTerminal>;
    } else if (this.state.error) {
      console.log('REDNER2');

      //TODO swtich this to 1 return with variables?
      //TODO move styling to CSS
      return (
        <div>
          <Alert variant="danger" onClose={() => {
            console.log(this.props.location);
            console.log(this.props.history);
            this.setState({error: null}); 
            // this.props.location.state.error = null;
          }} dismissible>
            <Alert.Heading>Your WS connection has a problem</Alert.Heading>
            <p>
              {this.state.error.message}
            </p>
          </Alert>
          {/* This could be issue now with auth */}
          <WSHeader user={this.state.user} />
          <WSList
            wsData ={this.state.wsData} handleConnect = {this.handleConnect}
            handleDelete = {this.handleDelete} 
            handleAdd = {this.handleAdd}/>
        </div>
      
      )
    } else {
      return (

        <div>
          <WSHeader user={this.state.user} />
          <WSList
            wsData ={this.state.wsData} handleConnect = {this.handleConnect}
            handleDelete = {this.handleDelete} 
            handleAdd = {this.handleAdd}/>
          
        </div>
      )
    }

  }

  handleConnect(url) {
    this.setState({activeWS: url})
  }
  // handleDisconnect(err) {
  //   console.log('Here in WSC')
  //   this.setState({activeWS: null, error: err})

  //   //TODO Be more descriptive
  // }
  handleDelete(WSItemIndex) {
    console.log(WSItemIndex);
    console.log(this.state.wsData);
    const tempArr = this.state.wsData;
    tempArr.splice(WSItemIndex, 1);


    //TODO Refactor this out to one function
    // console.log({user: this.state.user, wsData: this.state.wsData.splice(WSItemIndex, 1)});
    axios.post('/api/updateWSHosts', {user: this.state.user, wsData: tempArr})
      .then(res =>{
        console.log(res);
        this.setState(res.data);
        //This is in promise to make sure 
        //that our stae is in sync with server. 
        console.log('Deleted')

        //TODO .catch
      }
      )
  }
  
  //TODO: Fix hitting enter to click add button
  handleAdd(title, url) {

    //TODO: Deal with adding duplicates
    if (url) {
      //TODO better validation and alert on fail
      // console.log(title)
      // console.log(url)
    
      const tempArr = this.state.wsData; 
      console.log(tempArr);
      console.log(tempArr.includes({name:title, url:url}))
      //TODO deal with isolateing _id

      let dup = false;
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].url === url) {
          dup = true;
        }
      }
      if (dup) {
        
        this.setState({error: new Error('Duplicate')});

      } else {

      
        tempArr.push({name: title, url: url});
        axios.post('/api/updateWSHosts', {user: this.state.user, wsData: tempArr})
          .then(res=>{
            this.setState(res.data);
          // console.log('Added')
          }

          )
      }
    }
  }


}

WSContainer.defaultProps = {
    
  location:{
    state: {
      appState: {error: null, activeWS: null, wsData:[{name:null, url:null}], user:true},
      activeWS: null,
      error: null
    }
  }
}

export default WSContainer;