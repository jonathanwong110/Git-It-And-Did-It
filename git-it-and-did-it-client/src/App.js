import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainNav from './components/Navigation/MainNav'
import './App.css';
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
import Users from './components/Users/index'
import UserShow from './components/Users/UserShow'
import UserEdit from './components/Users/UserEdit'
import SideBar from './components/Navigation/SideBar/SideBar'
import Tasks from './components/Tasks/index'
import TaskShow from './components/Tasks/TaskShow'
import Dashboard from './components/Dashboard/Dashboard'
import TaskNew from './components/Tasks/TaskNew'
import TaskEdit from './components/Tasks/TaskEdit'
import { setCurrentUser } from './redux/Auth/actions'
import { connect } from 'react-redux'
const NotFound = () => (<div className="emptyPage">This page is not available</div>)

class App extends Component {

  componentDidMount() {
    this.props.setCurrentUser()
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <SideBar />
          <div id="multipleBreaks"></div>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/users" render={() => JSON.parse(localStorage.getItem('token')) ? <Users /> : <Redirect to="/login" />} />
            <Route exact path="/users/:id" render={() => JSON.parse(localStorage.getItem('token')) ? <UserShow /> : <Redirect to="/login" />} />
            <Route exact path="/users/:id/edit" render={() => JSON.parse(localStorage.getItem('token')) ? <UserEdit /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard" render={() => JSON.parse(localStorage.getItem('token')) ? <Dashboard /> : <Redirect to="/login" />} />
            <Route exact path="/tasks" render={() => JSON.parse(localStorage.getItem('token')) ?  <Tasks /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/new" render={() => JSON.parse(localStorage.getItem('token')) ? <TaskNew /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/:id" render={() => JSON.parse(localStorage.getItem('token')) ? <TaskShow /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/category/:category" render={() => JSON.parse(localStorage.getItem('token')) ?  <Tasks /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/priority/:priority" render={() => JSON.parse(localStorage.getItem('token')) ?  <Tasks /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/status/:status" render={() => JSON.parse(localStorage.getItem('token')) ?  <Tasks /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/assignee/:assignee" render={() => JSON.parse(localStorage.getItem('token')) ?  <Tasks /> : <Redirect to="/login" />} />
            <Route exact path="/tasks/:id/edit" render={() => JSON.parse(localStorage.getItem('token')) ? <TaskEdit /> : <Redirect to="/login" />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, { setCurrentUser })(App)