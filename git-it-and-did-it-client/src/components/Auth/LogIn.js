import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

const LoginFormFunction = (props) => {
  return (
    <div className="login">
      <h2>Log In</h2>
      <Form onSubmit={data => props.handleSubmit(data)}>
        <Form.Field>
          <Field
            label='Username'
            name="username"
            type="text" />
        </Form.Field>
        <Form.Field>
          <Field
            label='Password'
            name="password"
            type="password" />
        </Form.Field>
        <Form.Button content='submit' />
      </Form>
    </div>
  );
}

const LogInForm = reduxForm({
	form: 'login'
})(LoginFormFunction);

export default LogInForm