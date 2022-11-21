import React from 'react'

import { Alert } from "antd";
const ErrorMessage = ({message}) => {
  return (
    <Alert message={message} type="error" showIcon />
  )
}

export default ErrorMessage