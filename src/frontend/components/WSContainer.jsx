import React from 'react'
import WSHeader from './WSHeader';
import WSList from './WSList';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import { Redirect } from 'react-router-dom'

class WSContainer extends React.Component {



  constructor(props) {
    super(props);
    this.isAuthenticated.bind(this);
    if (!this ?.props ?.location ?.state ?.appState ?.user) {
      return;
    }
    this.routeProps = this.props.location;
    // ;

    //Restore state (WS data, user etc.)
    this.state = this.routeProps.state.appState;

    // this.state = {error: null, activeWS: null, wsData:[{name:null, url:null}], user:null};


    //Update variable/local state from props
    this.state.error = this.routeProps.state.error;
    this.state.activeWS = this.routeProps.state.activeWS;

    this.props.history.replace('/console', { appState: this.state, error: null })



    this.handleConnect = this.handleConnect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.handleDeleteSaved = this.handleDeleteSaved.bind(this);



  }

  isAuthenticated() {
    return this ?.state ?.user;
  }




  render() {
    if (!this.isAuthenticated()) {
      return (
        <Redirect to='/NotAuthorized' />
      )
    }

    else if (this.state.activeWS) {


      return (<Redirect push to={{
        pathname: '/terminal',
        state: {
          activeWS: this.state.activeWS,
          appState: this.state

        }
      }} />)
    } else if (this.state.error) {

      return (
        <div>
          <Alert variant="danger" onClose={() => {
            this.setState({ error: null });
          }} dismissible>
            <Alert.Heading>There was a Problem!</Alert.Heading>
            <p>
              {this.state.error.message}
            </p>
          </Alert>
          <div className='console'>
            <WSHeader user={this.state.user} />
            <WSList
              wsData={this.state.wsData} handleConnect={this.handleConnect}
              handleDelete={this.handleDelete}
              handleDeleteSaved={this.handleDeleteSaved}
              handleAdd={this.handleAdd} />
          </div>
        </div>

      )
    } else {
      return (

        <div>
          <div className='console'>
            <WSHeader user={this.state.user} />
            <WSList
              wsData={this.state.wsData} handleConnect={this.handleConnect}
              handleDelete={this.handleDelete}
              handleDeleteSaved={this.handleDeleteSaved}
              handleAdd={this.handleAdd} />
          </div>
        </div>
      )
    }

  }

  handleDeleteSaved(i, j) {
    const tempArr = this.state.wsData;
    const tempSaved = this.state.wsData[i].saved;
    tempSaved.splice(j, 1);

    tempArr[i].saved = tempSaved;

    axios.post('/api/updateWSHosts', { user: this.state.user, wsData: tempArr })
      .then(res => {
        this.setState({...res.data});
        //TODO .catch
      }
      )

  }
  handleConnect(url) {
    this.setState({ activeWS: url })
  }
  handleDelete(WSItemIndex) {
    const tempArr = this.state.wsData;
    tempArr.splice(WSItemIndex, 1);


    axios.post('/api/updateWSHosts', { user: this.state.user, wsData: tempArr })
      .then(res => {
        this.setState({...res.data});

        //TODO .catch
      }
      )
  }

  //TODO: Fix hitting enter to click add button
  handleAdd(title, url) {

    if (url) {

      const tempArr = this.state.wsData;


      let dup = false;
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].url === url) {
          dup = true;
        }
      }
      if (dup) {

        this.setState({ error: new Error('Duplicate') });

      } else {


        tempArr.push({ name: title, url: url });
        axios.post('/api/updateWSHosts', { user: this.state.user, wsData: tempArr })
          .then(res => {
            console.log(res.data)
            this.setState({...res.data});
          }

          )
      }
    }
  }



}

WSContainer.defaultProps = {

  location: {
    state: {
      appState: { error: null, activeWS: null, wsData: [{ name: null, url: null, saved: [] }], user: true },
      activeWS: null,
      error: null
    }
  }
}

export default WSContainer;