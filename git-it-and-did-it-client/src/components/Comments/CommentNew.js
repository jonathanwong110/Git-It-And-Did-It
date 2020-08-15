import React, { Component } from 'react'
// import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

class CommentNew extends Component {

  constructor() {
    super()
    this.state = {
      content: '',
      user_id: JSON.parse(localStorage.getItem('token')).id,
      task_id: localStorage.getItem('setMostCurrentlySeenTask')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { ...this.state }
    this.setState({
      content: '',
      user_id: JSON.parse(localStorage.getItem('token')).id,
      task_id: '',
    });
    this.props.addComment(newComment)
  }

  render() {
    return (
      <Form id="newCommentForm">
        <Form.Group>
          <input type="text" name="comment" placeholder="Comment" onChange={e => this.handleChange(e)} value={this.content}></input>
        </Form.Group>
        <Button variant="primary" type="submit" id="newCommentSubmit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default CommentNew