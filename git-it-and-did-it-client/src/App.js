import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import MainNav from './components/Navigation/MainNav'
import './App.css';
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <br></br>
          <br></br>
          <Switch>
            <Route exact path="/login" render={() => this.props.currentUser ? <Redirect to="/" /> : <LogIn />} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(App)