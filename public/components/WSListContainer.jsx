/* eslint-disable react/prop-types */
import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class WSListContainer extends React.Component {
  //TODO: Rename to WSList?

  constructor(props) {
    super(props)
    this.newWSurl = null;
    this.newWSTitle = null;
    
  }

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
        <Button onClick = {() => this.props.handleConnect(wsData[i].url)}>Connect
        </Button>
        <Button className="delete" onClick = {() => this.props.handleDelete(i)}>Delete
        </Button>
        
      </td>);

      wsItems.push(<tr key={i + 'row'}>{wsRow}</tr>);
    }

    //TODO: Add finding feature?

    return (
      <div>
        <Table>
          <tbody>
            {wsItems}
          </tbody>
          
          {/* TODO: Popup only with button <Button onClick = {() => this.props.handleAdd(wsData[i].url)}>Add a Server!
          </Button> */}

        </Table>

        {/* TODO: Change all this UI etc. */}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange= {(e) => this.newWSTitle = e.target.value}type="text" placeholder="WS connection 1" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>URL</Form.Label>
            <Form.Control onChange= {(e) => this.newWSurl = e.target.value} type="url" placeholder="ws://localhost:8080" />
          </Form.Group>
          <Button onClick= {() => this.props.handleAdd(this.newWSTitle, this.newWSurl)}variant="primary" type="button">
    Add
          </Button>
        </Form>

      </div>
    )
  }

}


export default WSListContainer;