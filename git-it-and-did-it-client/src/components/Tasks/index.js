import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import { CardDeck, Container, Col, Row } from 'react-bootstrap'
import TaskShow from './TaskShow'

class Tasks extends Component {

  componentDidMount() {
    this.props.loadTasks()
  }

  render() {
    const { tasks } = this.props
    return (
      <CardDeck>
        <Container>
          <Row>
            {tasks.map(task => {
              return (
                <Col key={task.id}>
                  <TaskShow key={task.id} task={task}></TaskShow>
                </Col>
              )
            })}
          </Row>
        </Container>
      </CardDeck>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    tasks: state.tasks.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)