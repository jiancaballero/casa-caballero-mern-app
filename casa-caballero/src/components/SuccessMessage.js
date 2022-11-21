import React from "react";

import { Alert } from "antd";
const SuccessMessage = ({ message }) => {
  return <Alert message={message} type="success" showIcon />;
};

export default SuccessMessage;
