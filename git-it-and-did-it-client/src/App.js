import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
            <Route exact path="/login"> <LogIn/> </Route>
            <Route exact path="/signup"> <SignUp/> </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App