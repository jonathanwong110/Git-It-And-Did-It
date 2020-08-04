import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainNav from './components/Navigation/MainNav'
import './App.css';
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/Auth/selector";
import { checkUserSession } from "./redux/Auth/actions";
import { connect } from "react-redux";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <BrowserRouter>
      <div className="App">
        <MainNav />
        <br></br>
        <br></br>
        <Switch>
          <Route exact path="/login"> <LogIn render={() =>
            currentUser ? <Redirect to="/login" /> : <LogIn />
          } /> </Route>
          <Route exact path="/signup"> <SignUp /> </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { checkUserSession })(App);