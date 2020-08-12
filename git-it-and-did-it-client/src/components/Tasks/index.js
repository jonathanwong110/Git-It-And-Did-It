import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import { Nav, Navbar, CardDeck, Container, Col, Row } from 'react-bootstrap'
import TaskDisplay from './TaskDisplay'
import SearchTasks from './SearchTasks'
import { Link } from 'react-router-dom'

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      searchEntry: '',
      searchQuery: '',
      loading: false
    }
  }

  componentDidMount() {
    this.props.loadTasks()
  }

  handleChange = (e) => {
    this.setState({
      searchEntry: e.target.value.toLowerCase(),
      loading: true
    })
  }

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = this.state.searchEntry
    this.setState({
      searchQuery
    })
  }

  render() {
    const { searchEntry, searchQuery } = this.state
    let { tasks, match } = this.props
    if (searchQuery.length > 0) { tasks = tasks.filter(item => item.title.toLowerCase().includes(searchQuery)) }

    return (
      <>
        <Navbar bg="light" id="task-navbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar id="task-navbar-child">
            <Nav className="mr-auto">
              <Link to="/tasks" id="category-section"> All </Link>
            </Nav>
            <Nav className="mr-auto">
              <Link to="/tasks/bugs" id="category-section"> Bugs </Link>
            </Nav>
            <Nav className="mr-auto">
              <Link to="/tasks/new_features" id="category-section"> New Features </Link>
            </Nav>
            <SearchTasks onKeyPress={this.onKeyPress} {...{ searchEntry, searchQuery }} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          </Navbar>
        </Navbar>
        <CardDeck>
          <Container>
            <Row>
              {tasks.map(task => {
                return (
                  <Col key={task.id}>
                    <TaskDisplay key={task.id} task={task} match={match}></TaskDisplay>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </CardDeck>
      </>
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