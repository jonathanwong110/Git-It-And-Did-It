import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import MainNav from './components/Navigation/MainNav'
import './App.css';
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
import Users from './components/Users/index'
import UserDisplay from './components/Users/UserDisplay'
import SideBar from './components/Navigation/SideBar/SideBar'
import Tasks from './components/Tasks/index'
import TaskShow from './components/Tasks/TaskShow'


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <SideBar />
          <br></br>
          <br></br>
          <Switch>
            <Route exact path="/login" render={() => this.props.currentUser ? <Redirect to="/" /> : <LogIn />} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={UserDisplay} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/tasks/:id" component={TaskShow}/>
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

export default connect(mapStateToProps)(App)