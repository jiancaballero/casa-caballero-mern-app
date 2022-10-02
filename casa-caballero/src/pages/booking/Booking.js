import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, message, Steps } from "antd";
import moment from "moment";

import RoomList from "../../components/RoomList";

import BookingSummary from "../../components/BookingSummary";
// import RoomList from './pages/room/RoomList';
const Booking = () => {
  // TODO:user must be redirected to the homepage when check in is modifid in url
  const search = useLocation().search;
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [numberOfNights, setNumberOfNights] = useState(0);
  useEffect(() => {
    setNumberOfNights(checkOutDate.diff(checkInDate, "days"));
  }, []);

  //   STEPPER
  const { Step } = Steps;
  const steps = [
    {
      title: "Select Your Room",
      content: <RoomList />,
    },
    {
      title: "Enter Your Personal Information",
      content: "Second-content",
    },
    {
      title: "Review And Pay",
      content: "Last-content",
    },
  ];
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  //   const prev = () => {
  //     setCurrent(current - 1);
  //   };
  return (
    <div className="BookingPage">
      <div className="container">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {/* INSERT CONTENT FROM STEPS ARRAY */}
        <div className="flex step-container">
          <div className="step-content-container">
            <div className="steps-content">{steps[current].content}</div>
          </div>
          <div className="BookingAmountSection">
            <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={numberOfNights}
            />
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  CONTINUE
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  CONTINUE
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
