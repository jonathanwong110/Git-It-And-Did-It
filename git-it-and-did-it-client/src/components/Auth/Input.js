import React from 'react';
import { Input } from 'semantic-ui-react'

const InputField = ({label, type, input}) => (
    <div className="input-row">
     <label>{label}</label>
      <Input {...input} type={type}/>
    </div>
  )

export default InputField;