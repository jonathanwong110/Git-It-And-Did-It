import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import InputField from './Input'

const SignUpFormFunction = (props) => {
  return (
    <div className="signup">
      <Form onSubmit={data => props.handleSubmit(data)}>
        <Form.Field>
          <Field
            label='Email'
            name="email"
            component={InputField}
            type="email" />
        </Form.Field>
        <Form.Field>
          <Field
            label='Username'
            name="username"
            component={InputField}
            type="text" />
        </Form.Field>
        <Form.Field>
          <Field
            label='Password'
            name="password"
            component={InputField}
            type="password" />
        </Form.Field>
        <br></br>
        <Form.Button content='Sign Up' />
      </Form>
    </div>
  );
}


const SignUpForm = reduxForm({
  form: 'signup'
})(SignUpFormFunction);

export default SignUpForm;