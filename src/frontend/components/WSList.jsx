/* eslint-disable react/prop-types */
import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import WSForm from './WSForm'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FileSaver from 'file-saver'

class WSList extends React.Component {
  //TODO: Rename to WSList?

  constructor(props) {
    super(props)    

  }

  downloadText(text, fileName) {
    {
      const toDownload = new Blob([text], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(toDownload, fileName + '.txt');
    }
  }
  //TODO: DECIDE how to order lists
  render() {
    const wsData = this.props.wsData;
    // console.log(this.props);
    // console.log(wsData[0]);
    const wsItems = [];
    for (let i = 0; i < wsData.length; i++) {
      const wsRow = [];
      wsRow.push(<Col key={i + 'c0'}>{wsData[i].name}</Col>);
      wsRow.push(<Col key={i + 'c1'}>{wsData[i].url}</Col> );
      wsRow.push(<Col key={i + 'c2'}>
        <ButtonToolbar aria-label='Connect and Delete Buttons'>
          <Button className = 'mr-2' onClick = {() => this.props.handleConnect(wsData[i].url)}>Connect
          </Button>
          <Button variant= 'danger' className="delete" onClick = {() => this.props.handleDelete(i)}>Delete
          </Button>
        </ButtonToolbar>
        
      </Col>);
      const wsSavedRow = []
      for (let j = 0; j < wsData[i].saved.length; j++) {
        wsSavedRow.push(<Row key ={j + 'saved'}>
          <Col>
            <a href='javascript:;' onClick={()=> {
              this.downloadText(wsData[i].saved[j].text, wsData[i].saved[j].fileName)
            }
            }>{wsData[i].saved[j].time}</a>
          </Col>
          <Col>
            <a style={{color: 'red'}} href='javascript:;' onClick={()=> {
              this.props.handleDeleteSaved(i,j)
            }
            }>X</a>
          </Col>
        
        </Row>)
      }
      

      wsItems.push(<Card>
        <Accordion.Toggle as={Button} variant='light' eventKey={i + 'row'}>
          <Row key={i + 'row'}>{wsRow}</Row> 
        </Accordion.Toggle>  

        <Accordion.Collapse eventKey={i + 'row'}>

          <Card.Body>{wsSavedRow}</Card.Body>
        </Accordion.Collapse>
 
      </Card>);
    }

    //TODO: Add finding feature?



    return (
      <div>
        <WSForm handleAdd = {this.props.handleAdd} />
        <Accordion defaultActiveKey="0">
          {/* <Table bordered='true'> */}
          {/* <thead>
              <tr>

                <th>Connection Name</th>
                <th>Hostname or IP</th>
                <th></th>

              </tr>
            </thead>

            <tbody>
              {wsItems}
            </tbody> */}

          <Card>
            {/* <Container> */}
            <Row> 
              <Col>
                Connection Name
              </Col>
              <Col>
                Hostname or IP
              </Col>
              <Col></Col>
            </Row>
            {/* </Container> */}
          </Card>
          {wsItems}
          
          {/* TODO: Popup only with button <Button onClick = {() => this.props.handleAdd(wsData[i].url)}>Add a Server!
          </Button> */}

          {/* </Table> */}
        </Accordion>
        {/* <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <CustomToggle eventKey="1">Click me!</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> */}


        {/* TODO: Change all this UI etc. and form handling to be better*/}
      </div>
    )
  }

}


export default WSList;