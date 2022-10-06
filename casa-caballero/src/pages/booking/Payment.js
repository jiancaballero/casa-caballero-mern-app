import React from "react";
import BookingSummary from "../../components/BookingSummary";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import BookingSteps from "../../components/BookingSteps";
const Payment = () => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const room = new URLSearchParams(search).get("room");
  const bookedRoom = new URLSearchParams(search).get("rmId");
  const rate = new URLSearchParams(search).get("rate_type");
  const nights = new URLSearchParams(search).get("nights");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  return (
    <div className="PaymentSection">
      <div className="container">
        <BookingSteps />
        <div className="flex payment-container">
          <div className="payment-left">
            <div>PaymentForm</div>
          </div>
          <div className="payment-right">
            <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={nights}
              bookedRoom={bookedRoom}
              room={room}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
