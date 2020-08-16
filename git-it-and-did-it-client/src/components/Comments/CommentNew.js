import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import { addComment } from '../../redux/Comments/actions.js'

class CommentNew extends Component {

  constructor() {
    super()
    this.state = {
      content: '',
      user_id: JSON.parse(localStorage.getItem('token')).id,
      task_id: JSON.parse(localStorage.getItem('setMostCurrentlySeenTask')).id
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
      task_id: JSON.parse(localStorage.getItem('setMostCurrentlySeenTask')).id
    });
    this.props.addComment(newComment)
  }

  render() {
    return (
      <Form id="newCommentForm" onSubmit={e => this.handleSubmit(e)}>
        <Form.Group>
          <input type="text" name="content" placeholder="Comment" onChange={e => this.handleChange(e)} value={this.state.content} className="form-input-field"></input>
        </Form.Group>
        <Button variant="primary" type="submit" id="newCommentSubmit">
          Submit
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => dispatch(addComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(CommentNew)
