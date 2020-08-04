import React, { Component } from 'react';

class SignUpForm extends Component {
  state = {
    username: '',
    password: ''
  };


  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      return this.props.handleLogin(this.state)
    }
  }


  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <div>
          <label>
            Email
          <input id="email" name="email" type="text" onChange={event => this.handleInputChange(event)} />
          </label>
        </div>
        <div>
          <label>
            Username
          <input id="username" name="username" type="text" onChange={event => this.handleInputChange(event)} />
          </label>
        </div>
        <div>
          <label>
            Password
          <input id="password" name="password" type="password" onChange={event => this.handleInputChange(event)} />
          </label>
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    );
  }
}

export default SignUpForm