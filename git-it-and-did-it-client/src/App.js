import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNav from './components/navigation/MainNav'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <Switch>
            <div>Testing</div>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App