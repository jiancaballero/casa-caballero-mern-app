import React from "react";
import BookingSummary from "../../components/BookingSummary";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import BookingSteps from "../../components/BookingSteps";
import axios from "axios";
import SuccessPayment from "../payment/SuccesPayment";
const Payment = () => {
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
  const guest_details = location.state.registration
  const first_name = location.state.firstName;
  const last_name = location.state.lastName;
  const phone = location.state.phone;
  const email = location.state.email;
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const getPayment = () => {
    try {
      axios
      .post("http://localhost:8080/api/bookings", {
        room_id: room_id,
        booking_start: checkInDate.format('LL'),
        booking_end: checkOutDate.format('LL'),
        isGuest:true,
        room_type:room_type,
        guest_details:guest_details,
        adult:adult,
        child:child,
        number_of_rooms:room,
        
       
        
      }).then((res)=>{
       console.log(res);
        if(res.status === 201){
          navigate({pathname:'/payment/success'});
        }
        else{
          navigate({pathname:'/'});
        }
        
      })
    } catch (error) {
      
    }
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
