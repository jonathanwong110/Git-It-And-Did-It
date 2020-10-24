import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers, getSpecificUser } from '../../redux/Users/actions'
import { getUserTasks, getAssignedTasks } from '../../redux/Tasks/actions'
import { setCurrentUser } from '../../redux/Auth/actions'
import { CardDeck, Container, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'
import TaskDisplay from '../Tasks/TaskDisplay'

class UserShow extends Component {

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      let userId = Number(this.props.match.params.id)
      this.props.getSpecificUser(userId)
      this.props.getUserTasks(userId)
    } else {
      const currentUser = JSON.parse(localStorage.getItem('token'))
      const currentUserId = currentUser.id
      let userId = Number(this.props.match.params.id)
      this.props.getSpecificUser(userId)
      if (currentUserId === userId) {
        return this.props.history.push('/dashboard')
      }
      this.props.getUserTasks(userId)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.specificUser.username !== this.props.specificUser.username) {
      this.props.getAssignedTasks(this.props.specificUser.username)
    }
  }

  render() {

    let { specificUser, tasks, assignedTasks, match } = this.props

    if (specificUser && specificUser.id === undefined) {
      return <div className="emptySection">This user does not exist</div>
    }

    return (
      <div>
        <div className="profileSectionWrapper">
          <Image src={specificUser.profile_icon} id="specificUserProfileIcon" />
          <br></br>
          <div className="specificUserProfileEdit">
            <Link to={`users/${specificUser.id}/edit`} className="specificUserProfileEditLink">
              Edit Profile
          </Link>
          </div>
          <br></br>
          <h1 className="specificUserUsername">{specificUser.username}</h1>
          <br></br>
          <h5 className="specificUserEmail">{specificUser.email}</h5>
          <br></br>
          <br></br>
          <h2 className="taskSection">Tasks Reported</h2>
          <br></br>
        </div>
        <CardDeck>
          <Container>
            <Row className="taskRow">
              {tasks.length === 0 ?
                <div>This user has not reported any tasks yet </div> :
                tasks.map(task => {
                  return (
                    <TaskDisplay key={task.id} task={task} match={match} />
                  )
                })
              }
            </Row>
          </Container>
        </CardDeck>
        <div className="profileSectionWrapper">
          <br></br>
          <br></br>
          <h2 className="taskSection">Tasks Assigned</h2>
          <br></br>
        </div>
        <CardDeck>
          <Container>
            <Row className="taskRow">
              {assignedTasks.length === 0 ?
                <div>This user has not been assigned tasks yet </div> :
                assignedTasks.map(task => {
                  return (
                    <TaskDisplay key={task.id} task={task} match={match} />
                  )
                })
              }
            </Row>
          </Container>
        </CardDeck>
        <br></br>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    specificUser: state.users.specificUser,
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks
  }
}

export default connect(mapStateToProps, { loadUsers, getSpecificUser, getUserTasks, getAssignedTasks, setCurrentUser, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(UserShow)