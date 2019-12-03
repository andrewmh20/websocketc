/* eslint-disable react/prop-types */
import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import WSForm from './WSForm'
class WSList extends React.Component {
  //TODO: Rename to WSList?

  constructor(props) {
    super(props)    

  }

  //TODO: DECIDE how to order lists
  render() {
    const wsData = this.props.wsData;
    // console.log(this.props);
    // console.log(wsData[0]);
    const wsItems = [];
    for (let i = 0; i < wsData.length; i++) {
      const wsRow = [];
      wsRow.push(<td key={i + 'c0'}>{wsData[i].name}</td>);
      wsRow.push(<td key={i + 'c1'}>{wsData[i].url}</td> );
      wsRow.push(<td key={i + 'c2'}>
        <ButtonToolbar aria-label='Connect and Delete Buttons'>
          <Button className = 'mr-2' onClick = {() => this.props.handleConnect(wsData[i].url)}>Connect
          </Button>
          <Button variant= 'danger' className="delete" onClick = {() => this.props.handleDelete(i)}>Delete
          </Button>
        </ButtonToolbar>
        
      </td>);

      wsItems.push(<tr key={i + 'row'}>{wsRow}</tr>);
    }

    //TODO: Add finding feature?

    return (
      <div>
        <WSForm handleAdd = {this.props.handleAdd} />
        <Table bordered='true'>
          <thead>
            <tr>

              <th>Connection Name</th>
              <th>Hostname or IP</th>
              <th></th>

            </tr>
          </thead>

          <tbody>
            {wsItems}
          </tbody>
          
          {/* TODO: Popup only with button <Button onClick = {() => this.props.handleAdd(wsData[i].url)}>Add a Server!
          </Button> */}

        </Table>


        {/* TODO: Change all this UI etc. and form handling to be better*/}
      </div>
    )
  }

}


export default WSList;