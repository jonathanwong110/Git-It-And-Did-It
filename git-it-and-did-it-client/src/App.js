import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <div>Testing</div>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App