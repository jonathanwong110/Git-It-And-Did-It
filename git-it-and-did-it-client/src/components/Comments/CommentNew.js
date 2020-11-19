import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import { addComment } from '../../redux/Comments/actions.js'

class CommentNew extends Component {

  constructor() {
    super()
    this.state = {
      content: '',
      user_id: '',
      task_id: ''
    }
  }

  componentDidMount() {
    this.setState({
      user_id: this.props.task.user_id,
      task_id: this.props.task.id,
    })
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
      user_id: this.props.task.user_id,
      task_id: this.props.task.id,
    });
    this.props.addComment(newComment)
  }

  render() {

    if (JSON.parse(localStorage.getItem('token')) === null) {
      return null
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} id="newCommentForm">
        <Form.Group>
          <input type="text" name="content" placeholder="Add a comment" onChange={e => this.handleChange(e)} value={this.state.content} className="formInputField"/>
        </Form.Group>
        <Button variant="primary" type="submit" id="newCommentSubmit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default connect(null, {addComment})(CommentNew)
