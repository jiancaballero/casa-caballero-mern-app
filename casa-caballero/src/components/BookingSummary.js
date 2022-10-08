import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import RoomSelected from "./RoomSelected";

const BookingSummary = ({
  checkIn,
  checkOut,
  adult,
  child,
  nights,
  bookedRoom,
  room_type,
  rate_type,
  rate
}) => {
  
  return (
    <div>
      {" "}
      <h1>Booking Summary</h1>
      <div className="flex booking-right">
        <div className="check-in-time-container">
          <div className="flex check-in-time">
            <h3>Check-in</h3>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div>
            <h3>2:00 pm onwards</h3>
          </div>
        </div>
        <div className="check-out-time-container">
          <div className="flex check-out-time">
            <h3>Check-out</h3>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div>
            <h3>12:00 pm noon</h3>
          </div>
        </div>
      </div>
      <Divider />
      
        <RoomSelected
          checkIn={checkIn}
          checkOut={checkOut}
          adult={adult}
          child={child}
          nights={nights}
          room_type={room_type}
          rate_type={rate_type}
          room_rate={rate}
        />
    
    </div>
  );
};

export default BookingSummary;
