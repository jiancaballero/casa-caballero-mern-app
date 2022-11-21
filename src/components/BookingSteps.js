import React, { useState } from "react";
import { Steps } from "antd";
import { useLocation } from "react-router-dom";
const { Step } = Steps;
const BookingSteps = () => {
  const search = useLocation().search;
  const currentStep = parseInt(new URLSearchParams(search).get("step"));
  
  
  return (
    <div>
      <Steps current={currentStep}>
        <Step title="Select Your Room" />
        <Step title="Enter Your Personal Details" />
        <Step title="Review And Pay" />
      </Steps>
    </div>
  );
};

export default BookingSteps;
