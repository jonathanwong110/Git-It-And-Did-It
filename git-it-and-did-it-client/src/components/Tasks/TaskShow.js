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
    let taskId = this.props.match.params.id
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
          {specificTask.task.title}
        </p>
        {currentUser.user?.id === specificTask.task.user_id ?
          <Button className="taskOptionsButton">
            <Link to={`/tasks/${specificTask.task.id}/edit`} className="taskOptionsLink">Edit</Link>
          </Button>
          : null}
        {currentUser.user?.id === specificTask.task.user_id ?
          <Button onClick={this.deleteCurrentTask} className="taskOptionsButtons">Delete</Button> : null}
        <div className="taskDetailsSection">
          <div className="taskDetailsHeading"> Details </div>
          <br></br>
          <div className="taskTraitsGrid">
            <p className="taskTraits"> Category: </p>
            <p className="tasksTraitSecondCol">
              {categoryNameChanger(specificTask.task.category)}
            </p>
            <p className="taskTraits"> Priority: </p>
            <p className="tasksTraitSecondCol">
              {capitalizeFirstLetter(specificTask.task.priority)}
            </p>
            <div className="taskTraits"> Status: </div>
            <p className="tasksTraitSecondCol">
              {statusNameChanger(specificTask.task.status)}
            </p>
          </div>
        </div>
        <br></br>
        <div className="taskPeopleSection">
          <div className="taskPeopleHeading"> People </div>
          <br></br>
          <div className="taskTraitsGrid">
            <div className="taskTraits"> Reporter: </div>
            <div className="tasksTraitSecondCol">
              <p><Link to={`/users/${specificTask.user.id}`} className="plainLink">{specificTask.user.username}</Link></p>
            </div>
            <div className="taskTraits"> Assignee: </div>
            <div className="tasksTraitSecondCol">
              <Link to={`/users/${specificTask.assignee.id}`} className="plainLink">{specificTask.assignee.username}</Link>
            </div>
          </div>
        </div>
        <br></br>
        <div className="taskDescriptionSection">
          <div className="taskDescriptionHeading"> Description </div>
          <br></br>
          <div id="descriptionBox">{specificTask.task.description}</div>
        </div>
        <div className="taskDatesSection">
          <div className="taskDateHeading"> Dates </div>
          <br></br>
          <div className="taskTraitsGrid">
            <div className="taskTraits"> Created: </div>
            <p className="taskTraits">
              {changeDateFormat(specificTask.task.created_at) + ' ' + changeTimeFormat(specificTask.task.created_at)}
            </p>
            <div className="taskTraits"> Updated: </div>
            <p className="taskTraits">
              {changeDateFormat(specificTask.task.updated_at) + ' ' + changeTimeFormat(specificTask.task.updated_at)}
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="taskCommentHeading">Comments</div>
        <div id="taskCommentsAmount">{comments.length} Comment(s)</div>
        <CommentNew task={specificTask.task} />
        <div className="taskCommentsSection">
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <div key={comment.id} className="taskIndividualComment">
                  <Image className="taskCommentAttributeDetail"
                    src={comment.user.profile_icon} alt="profile picture" style={{ width: '40px' }}
                  />
                  <div className="taskCommentAttributeDetail">
                    {comment.username}
                  </div>
                  <div className="taskCommentAttributeDetail">
                    {changeDateFormat(comment.created_at)}
                  </div>
                  <div className="taskCommentAttributeDetail">
                    {changeTimeFormat(comment.created_at)}
                  </div>
                  {currentUser.user.id === specificTask.task.user_id || currentUser.user.id === comment.user_id ? <Button variant="primary" id="taskCommentDeleteButton" onClick={() => deleteComment(comment.id)}>X</Button> : null}
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

export default compose(withRouter, connect(mapStateToProps, { setCurrentUser, deleteTask, deleteComment, getSpecificTask, getTaskComments, capitalizeFirstLetter, categoryNameChanger, statusNameChanger }))(TaskShow)