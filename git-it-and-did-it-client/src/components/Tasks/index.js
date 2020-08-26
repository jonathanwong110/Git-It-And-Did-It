import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import { Nav, Navbar, NavDropdown, CardDeck, Container, Row } from 'react-bootstrap'
import TaskDisplay from './TaskDisplay'
import SearchTasks from './SearchTasks'
import { Link } from 'react-router-dom'

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      searchEntry: '',
      searchQuery: '',
      loading: false,
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
        <Navbar id="task-navbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar id="task-navbar-child">
            <Nav className="mr-auto" id="category-section">
              <NavDropdown title="Category" className="category-section-title">
                <Link to="/tasks" id="category-section-link">All</Link><br></br>
                <Link to="/tasks/bugs" id="category-section-link">Bugs</Link><br></br>
                <Link to="/tasks/new_features" id="category-section-link">New Features</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto" id="category-section">
              <NavDropdown title="Priority" className="category-section-title">
                <Link to="/tasks" id="category-section-link">All</Link><br></br>
                <Link to="/tasks/low" id="category-section-link">Low</Link><br></br>
                <Link to="/tasks/medium" id="category-section-link">Medium</Link><br></br>
                <Link to="/tasks/high" id="category-section-link">High</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto" id="category-section">
              <NavDropdown title="Status" className="category-section-title">
                <Link to="/tasks" id="category-section-link">All</Link><br></br>
                <Link to="/tasks/to_do" id="category-section-link">To Do</Link><br></br>
                <Link to="/tasks/in_progress" id="category-section-link">In Progress</Link><br></br>
                <Link to="/tasks/finished" id="category-section-link">Finished</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto" id="category-section">
              <SearchTasks onKeyPress={this.onKeyPress} {...{ searchEntry, searchQuery }} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </Nav>
          </Navbar>
        </Navbar>
        <CardDeck>
          <Container>
            <Row id="task-row">
              {tasks.map(task => {
                return (
                  <TaskDisplay key={task.id} task={task} match={match} />
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

export default connect(mapStateToProps, { loadTasks })(Tasks)