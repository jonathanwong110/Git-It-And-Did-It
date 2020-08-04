import React, { Component } from 'react';

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }



  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      return this.props.handleLogin(this.state)
    }
  }


  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <h5>
            Username
          </h5>
          <input id="username" name="username" type="text" onChange={e => this.handleInputChange(e)} />
        </div>
        <div>
          <h5>
            Password
          </h5>
          <input id="password" name="password" type="password" onChange={e => this.handleInputChange(e)} />
        </div>
        <br></br>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    );
  }
}

export default LogInForm