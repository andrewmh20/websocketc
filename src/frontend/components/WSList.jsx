/* eslint-disable react/prop-types */
import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import WSForm from './WSForm'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FileSaver from 'file-saver'

class WSList extends React.Component {

  constructor(props) {
    super(props)

  }

  downloadText(text, fileName) {
    {
      const toDownload = new Blob([text], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(toDownload, fileName + '.txt');
    }
  }
  render() {
    const wsData = this.props.wsData;
    const wsItems = [];
    for (let i = 0; i < wsData.length; i++) {
      const wsRow = [];
      wsRow.push(<Col key={i + 'c0'}>{wsData[i].name}</Col>);
      wsRow.push(<Col key={i + 'c1'}>{wsData[i].url}</Col>);
      wsRow.push(<Col key={i + 'c2'}>
        <ButtonToolbar aria-label='Connect and Delete Buttons'>
          <Button className='mr-2' onClick={() => this.props.handleConnect(wsData[i].url)}>Connect
          </Button>
          <Button variant='danger' className="delete" onClick={() => this.props.handleDelete(i)}>Delete
          </Button>
        </ButtonToolbar>

      </Col>);
      const wsSavedRow = []
      for (let j = 0; j < wsData[i].saved.length; j++) {
        wsSavedRow.push(<Row key={j + 'saved'}>
          <Col>
            <a href='javascript:;' onClick={() => {
              this.downloadText(wsData[i].saved[j].text, wsData[i].saved[j].fileName)
            }
            }>{wsData[i].saved[j].time}</a>
          </Col>
          <Col>
            <a style={{ color: 'red' }} href='javascript:;' onClick={() => {
              this.props.handleDeleteSaved(i, j)
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

    return (
      <div>
        <WSForm handleAdd={this.props.handleAdd} />
        <Accordion defaultActiveKey="0">

          <Card>
            <Row>
              <Col>
                Connection Name
              </Col>
              <Col>
                Hostname or IP
              </Col>
              <Col></Col>
            </Row>
          </Card>
          {wsItems}

        </Accordion>

      </div>
    )
  }

}


export default WSList;