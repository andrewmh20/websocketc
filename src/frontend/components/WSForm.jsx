import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class WSForm extends React.Component {

  constructor(props) {
    super(props)

    this.placeholderTitle = 'My Home Server'
    this.placeholderURL = 'ws://localhost:8080'
    this.state = { title: '', url: '' };

    this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={(e) => this.newWSTitle = e.target.value} type="text" placeholder={this.placeholderTitle} />
        </Form.Group>

        <Form.Group >
          <Form.Label>URL</Form.Label>
          <Form.Control onChange={(e) => this.newWSurl = e.target.value} type="url" placeholder={this.placeholderURL} />
        </Form.Group>
        <Button onClick={() => this.handleSubmit(this.props.handleAdd)} variant="primary" type="button">
          Add
        </Button>
      </Form>
    )
  }

  handleSubmit(handler) {
    handler(this.newWSTitle, this.newWSurl);
    this.setState({ tile: this.placeholderTitle });
    this.setState({ url: this.placeholderURL })
  }
}

export default WSForm;