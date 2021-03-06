import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import { Nav, Navbar, NavDropdown, CardDeck, Container, Row } from 'react-bootstrap'
import TaskDisplay from './TaskDisplay'
import SearchTasks from './SearchTasks'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import SearchAssignee from './SearchAssignee'

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
    const { type, value } = this.getParamVal(this.props.match)
    this.fetchTasks(type, value)
  }

  getParamVal = (match) => {
    const { params } = match
    let type
    let value
    if (params) {
      type = Object.keys(params)[0]
      value = Object.values(params)[0]
    }
    return { type, value }
  }

  fetchTasks = (type, value) => {
    this.props.loadTasks(type, value)
    this.setState({
      type, value
    })
  }

  componentDidUpdate(prevProps) {
    const prevParams = this.getParamVal(prevProps.match)
    const currentParams = this.getParamVal(this.props.match)
    if (currentParams.type !== prevParams.type || currentParams.value !== prevParams.value) {
      this.fetchTasks(currentParams.type, currentParams.value)
    }
  }

  handleChange = (e) => {
    this.setState({
      searchEntry: e.target.value,
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
    const searchQuery = this.state.searchEntry.toLowerCase()
    this.setState({
      searchQuery
    })
  }

  render() {

    const { searchEntry, searchQuery } = this.state
    let { tasks, match } = this.props

    if (searchQuery.length > 0) { tasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery)) }

    return (
      <>
        <Navbar className="secondaryNavbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto category-section">
              <NavDropdown title="Category" className="category-section-title">
                <Link to="/tasks" className="category-section-link">All</Link><br></br>
                <Link to="/tasks/category/bugs" className="category-section-link">Bugs</Link><br></br>
                <Link to="/tasks/category/new_features" className="category-section-link">New Features</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto category-section">
              <NavDropdown title="Priority" className="category-section-title">
                <Link to="/tasks" className="category-section-link">All</Link><br></br>
                <Link to="/tasks/priority/low" className="category-section-link">Low</Link><br></br>
                <Link to="/tasks/priority/medium" className="category-section-link">Medium</Link><br></br>
                <Link to="/tasks/priority/high" className="category-section-link">High</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto category-section">
              <NavDropdown title="Status" className="category-section-title">
                <Link to="/tasks" className="category-section-link">All</Link><br></br>
                <Link to="/tasks/status/to_do" className="category-section-link">To Do</Link><br></br>
                <Link to="/tasks/status/in_progress" className="category-section-link">In Progress</Link><br></br>
                <Link to="/tasks/status/finished" className="category-section-link">Finished</Link>
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto category-section" >
              <NavDropdown title="Assignee" className="category-section-title">
                <Link to="/tasks" className="category-section-link">All</Link><br></br>
                <SearchAssignee history={this.props.history} />
              </NavDropdown>
            </Nav>
            <Nav className="mr-auto category-section">
              <SearchTasks onKeyPress={this.onKeyPress} {...{ searchEntry, searchQuery }} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </Nav>
        </Navbar>
        <CardDeck>
          <Container>
            <Row className="taskRow">
              {tasks.length !== 0 ? tasks.map(task => {
                return (
                  <TaskDisplay key={task.id} task={task} match={match} />
                )
              }) : <div className="emptyPage">No results found</div>}
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
    tasks: state.tasks.tasks,
  }
}

export default compose(withRouter, connect(mapStateToProps, { loadTasks }))(Tasks)