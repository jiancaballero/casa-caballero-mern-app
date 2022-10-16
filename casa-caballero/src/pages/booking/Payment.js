import React, { useState } from "react";
import BookingSummary from "../../components/BookingSummary";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import BookingSteps from "../../components/BookingSteps";
import axios from "axios";

const Payment = () => {
  var textCode = "";
  var numCode = "";
  var result = "";

  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var num = "0123456789";

  function textNumCode(textLength, numLength) {
    for (var i = 0; i < textLength; i++) {
      textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    for (var i = 0; i < numLength; i++) {
      numCode += num.charAt(Math.floor(Math.random() * num.length));
    }
  
    result = textCode.toUpperCase() + numCode;

    textCode = "";
    numCode = "";
    return result;
  }
  const search = useLocation().search;
  const location = useLocation();

  const navigate = useNavigate();
  const room_id = location.state.room_id;
  const room_type = location.state.room_type;
  const rate_type = location.state.rate_type;
  const rate_amount = location.state.rate_amount;
  const checkInStr = location.state.checkIn;
  const checkOutStr = location.state.checkOut;
  const adult = location.state.adult;
  const child = location.state.childe;
  const room = location.state.room;
  const nights = location.state.nights;
  const total = location.state.total
  const guest_details = location.state.registration;
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const vat = rate_amount * nights * 0.12;
  const serviceCharge = rate_amount * nights * 0.1;
  const localTax = rate_amount * nights * 0.015;
  const totalTax = serviceCharge + vat + localTax;
  const ratePerNight = rate_amount * nights;
  const totalAmount = ratePerNight + totalTax;
  // const [bkCode, setBkCode] = useState("");
  const getPayment = () => {
    const bkCode = textNumCode(3,4)
    console.log(bkCode)
    try {
      axios
        .post("http://localhost:8080/api/bookings", {
          room_id: room_id,
          booking_start: checkInDate.format("LL"),
          booking_end: checkOutDate.format("LL"),
          isGuest: true,
          room_type: room_type,
          guest_details: guest_details,
          adult: adult,
          child: child,
          number_of_rooms: room,
          bk_code:bkCode,
          rate_amount:rate_amount,
          rate_type:rate_type,
          nights:nights,
          total:total
        })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            navigate({ pathname: "/payment/success" },{email:res.data.email});
          } else {
            navigate({ pathname: "/" });
          }
        });
    } catch (error) {}
  };
  return (
    <div className="PaymentSection">
      <div className="container">
        <BookingSteps />
        <div className="flex payment-container">
          <div className="payment-left">
            <ul>
              <li>{guest_details.firstName}</li>
              <li>{room_id}</li>
              <li>{guest_details.lastName}</li>
              <li>{guest_details.phone}</li>
              <li>{guest_details.email}</li>
            </ul>
            <button onClick={getPayment}>Continue</button>
          </div>

          <div className="payment-right">
          <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={nights}
              room={room}
              room_type={room_type}
              rate_type={rate_type}
              rate={rate_amount}
              vat={vat}
              serviceCharge={serviceCharge}
              localTax={localTax}
              totalTax={totalTax}
              totalAmount={totalAmount}
              ratePerNight={ratePerNight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
