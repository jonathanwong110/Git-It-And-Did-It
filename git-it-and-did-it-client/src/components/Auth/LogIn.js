import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logInStart} from '../../redux/Auth/actions'

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newLogin = {...this.state}
    this.setState({
      username: '',
      password: ''
    })
    console.log('testing', logInStart(newLogin))
    logInStart(newLogin)
  }


  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <h5>
            Username
          </h5>
          <input id="username" name="username" type="text" onChange={e => this.handleChange(e)} value={this.username} />
        </div>
        <div>
          <h5>
            Password
          </h5>
          <input id="password" name="password" type="password" onChange={e => this.handleChange(e)} value={this.password}/>
        </div>
        <br></br>
        <div>
          <button type="submit" value="submit">Log in</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInStart: (newLogin) => dispatch(logInStart(newLogin))
  }
}

export default connect (null, mapDispatchToProps)(LogInForm)