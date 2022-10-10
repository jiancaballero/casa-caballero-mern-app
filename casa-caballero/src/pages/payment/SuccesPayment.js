import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getBooking = ()=>{
    navigate({pathname:'/manage-bookings'})
  }
  return (
    <div>
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="We have sent your booking code in your email."
        extra={[
          <Button type="primary" key="console" onClick={getBooking}>
            View Your Booking Here
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccessPayment;
