import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import InputField from './Input'

const LoginFormFunction = (props) => {
  return (
    <div className='login'>
      <h2>Log In</h2>
      <Form onSubmit={data => props.handleSubmit(data)}>
        <Form.Field>
          <Field
            label='Username'
            name='username'
            type='text' 
            component={InputField} />
        </Form.Field>
        <Form.Field>
          <Field
            label='Password'
            name='password'
            type='password'
            component={InputField} />
        </Form.Field>
        <br></br>
        <Form.Button content='submit' />
      </Form>
    </div>
  );
}

const LogInForm = reduxForm({
	form: 'login'
})(LoginFormFunction);

export default LogInForm