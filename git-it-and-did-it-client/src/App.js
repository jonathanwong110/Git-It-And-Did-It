import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNav from './components/Navigation/MainNav'
import './App.css';
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
// import { createStructuredSelector } from "reselect";
// import { selectCurrentUser } from "./redux/Auth/selector";
// import { checkUserSession } from "./redux/Auth/actions";
// import { connect } from "react-redux";

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <br></br>
          <br></br>
          <Switch>
            <Route exact path="/login" component={LogIn}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App