import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions'
import { deleteTask, getSpecificTask } from '../../redux/Tasks/actions'
import { getTaskComments, deleteComment } from '../../redux/Comments/actions'
import CommentNew from '../../components/Comments/CommentNew'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger, changeDateFormat, changeTimeFormat } from '../../appearance/appearanceFunctions'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'

class TaskShow extends Component {

  componentDidMount() {
    let { match } = this.props
    let taskId = match.params.id
    this.props.getSpecificTask(taskId)
    this.props.getTaskComments(taskId)
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.props.match.params.id, this.props.history)
  }

  render() {

    let { specificTask, currentUser, deleteComment, comments } = this.props

    if (specificTask && specificTask.task === undefined) {
      return <div className="emptyPage">This task does not exist</div>
    }

    return (
      <div className="individualTask">
        <p className="taskTitle">
          {capitalizeFirstLetter(specificTask.task.title)}
        </p>
        {currentUser.id === specificTask.task.user_id ?
          <Button className="taskOptionsButton">
            <Link to={`/tasks/${specificTask.task.id}/edit`} className="taskOptionsLink">Edit</Link>
          </Button> 
          : null}
        {currentUser.id === specificTask.task.user_id ?
          <Button onClick={this.deleteCurrentTask} className="taskOptionsButtons">Delete</Button> : null}
        <div className="taskDetailsSection">
          <p className="taskDetailsHeading"> Details </p>
          <div className="taskTraitsGrid">
            <p className="taskTraits"> Category: </p>
            <p className="tasksTraitSecondCol">
              {categoryNameChanger(specificTask.task.category)}
            </p>
            <p className="taskTraits"> Priority: </p>
            <p className="tasksTraitSecondCol">
              {capitalizeFirstLetter(specificTask.task.priority)}
            </p>
            <p className="taskTraits"> Status: </p>
            <p className="tasksTraitSecondCol">
              {statusNameChanger(specificTask.task.status)}
            </p>
          </div>
        </div>
        <br></br>
        <div className="taskPeopleSection">
          <p className="taskPeopleHeading"> People </p>
          <div className="taskTraitsGrid">
            <p className="taskTraits"> Reporter: </p>
            <p className="tasksTraitSecondCol">
              <Link to={`/users/${specificTask.task.user_id}`} className="plainLink">{specificTask.user.username}</Link>
            </p>
            <p className="taskTraits"> Assignee: </p>
            <p className="tasksTraitSecondCol">
              <Link to={`/users/${specificTask.assignee.id}`} className="plainLink">{specificTask.task.assignee}</Link>
            </p>
          </div>
        </div>
        <br></br>
        <div className="taskDescriptionSection">
          <p className="taskDescriptionHeading"> Description </p>
          <p className="taskTraits">
            {capitalizeFirstLetter(specificTask.task.description)}
          </p>
        </div>
        <div className="taskDatesSection">
          <p className="taskDateHeading"> Dates </p>
          <div className="taskTraitsGrid">
            <p className="taskTraits"> Created: </p>
            <p className="taskTraits">
              {changeDateFormat(specificTask.task.created_at) + ' ' + changeTimeFormat(specificTask.task.created_at)}
            </p>
            <p className="taskTraits"> Updated: </p>
            <p className="taskTraits">
              {changeDateFormat(specificTask.task.updated_at) + ' ' + changeTimeFormat(specificTask.task.updated_at)}
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        <p className="taskCommentHeading">Comments</p>
        <div id="taskCommentsAmount">{comments.length} Comment(s)</div>
        <CommentNew task={specificTask.task} />
        <div className="taskCommentsSection">
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <div key={comment.id} className="taskIndividualComment">
                <Image className="taskCommentAttributeDetail"
                    src={comment.user.profile_icon} style={{width: '40px'}}
                  />
                  <p className="taskCommentAttributeDetail">
                    {comment.username}
                  </p>
                  <p className="taskCommentAttributeDetail">
                    {changeDateFormat(comment.created_at)}
                  </p>
                  <p className="taskCommentAttributeDetail">
                    {changeTimeFormat(comment.created_at)}
                  </p>
                  {JSON.parse(localStorage.getItem('token')).id === specificTask.task.user_id || JSON.parse(localStorage.getItem('token')).id === comment.user_id ? <Button variant="primary" id="taskCommentDeleteButton" onClick={() => deleteComment(comment.id)}>X</Button> : null}
                </div>
                <div> {comment.content} </div>
                <br></br>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    specificTask: state.tasks.specificTask,
    comments: state.comments.comments
  }
}

export default compose(withRouter, connect(mapStateToProps, { setCurrentUser, deleteTask, deleteComment, getSpecificTask, getTaskComments, capitalizeFirstLetter, categoryNameChanger, statusNameChanger, changeDateFormat, changeTimeFormat }))(TaskShow)