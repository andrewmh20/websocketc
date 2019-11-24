import React from 'react'
import WSHeader from './WSHeader';
import WSList from './WSList';
import axios from 'axios';
import WSTerminal from './WSTerminal';
import Alert from 'react-bootstrap/Alert'
class WSContainer extends React.Component {



  constructor(props) {
    super(props);
    this.state =
     {user: null, wsData: [], activeWS: null, error: null}
    // console.log(this.state);

    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);



  }

  componentDidMount() {
    axios.get('/api/getUserData').then(res => {
      console.log(res.data);
      // this.setState({user: res.data.user, wsData: res.data.wsData});
      this.setState(res.data);
    }, 
    err => {
      console.log('AXIOS ERROR' + err);
    }
    )
  }


  render() {
    if (this.state.activeWS) {
      console.log(this.state.activeWS)
      return <WSTerminal url = {this.state.activeWS} handleDisconnect = {this.handleDisconnect}></WSTerminal>;
    } else if (this.state.alerted) {
      //TODO move styling to CSS
      return (
          
      //TODO: Change this to a Toast
        <div>
          <Alert variant="danger" onClose={() => this.setState({alerted: false, error: null})} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {this.state.error.message}
            </p>
          </Alert>
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
  handleDisconnect(err) {
    this.setState({activeWS: null, alerted: true, error: err})

    //TODO Be more descriptive
  }
  handleDelete(WSItemIndex) {
    console.log(WSItemIndex);
    console.log(this.state.wsData);
    const tempArr = this.state.wsData;
    tempArr.splice(WSItemIndex, 1);

    // console.log({user: this.state.user, wsData: this.state.wsData.splice(WSItemIndex, 1)});
    axios.post('/api/removeWSHost', {user: this.state.user, wsData: tempArr})
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
    if (title && url) {
      //Todo better validation
      console.log(title)
      console.log(url)
    
      const tempArr = this.state.wsData; 
      console.log(tempArr);
      tempArr.push({name: title, url: url});
      axios.post('/api/addWSHost', {user: this.state.user, wsData: tempArr})
        .then(res=>{
          this.setState(res.data);
          console.log('Added')


        }

        )
    }
  }


}


export default WSContainer;