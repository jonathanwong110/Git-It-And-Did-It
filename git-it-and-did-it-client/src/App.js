import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
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

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <SideBar />
          <br></br><br></br><br></br><br></br>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" render={() => JSON.parse(localStorage.getItem('token')) ? <Redirect to="/dashboard" /> : <LogIn />} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={UserShow} />
            <Route exact path="/users/:id/edit" component={UserShow} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/tasks" component={Tasks} />
            {/* <Route exact path="/tasks/:category" component={Tasks} /> */}
            <Route exact path="/tasks/:id" component={TaskShow} />
            <Route exact path="/tasks/new" component={TaskNew} />
            <Route exact path="/tasks/:id/edit" component={TaskEdit} />
            <Route exact path="/settings" component={UserEdit} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    users: state.users.users
  }
}

export default connect(mapStateToProps)(App)