import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,createSearchParams } from "react-router-dom";
import { Button, message, Steps } from "antd";

import moment from "moment";

import RoomList from "../../components/RoomList";

import BookingSummary from "../../components/BookingSummary";
import BookingSteps from "../../components/BookingSteps";
// import RoomList from './pages/room/RoomList';
const Booking = () => {
  // TODO:user must be redirected to the homepage when check in is modifid in url
  const navigate = useNavigate()
  const search = useLocation().search;
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [numberOfNights, setNumberOfNights] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState([]);
  useEffect(() => {
    setNumberOfNights(checkOutDate.diff(checkInDate, "days"));
  }, []);

  const getSelectedRoom = (roomID) => {
    setSelectedRoom(roomID);
  };
  const saveSelectedRoom =()=>{
    
    const params = {
      checkIn: checkInDate.format("YYYY-MM-DD"),
      checkOut: checkOutDate.format("YYYY-MM-DD"),
      adult: adult,
      child: child,
      step:1
    };
    navigate({
      pathname: "/booking/guest-details",
      search: `?${createSearchParams(params)}`,
    });


  }
  return (
    <div className="BookingPage">
      <div className="container">
        <BookingSteps/>
        {/* INSERT CONTENT FROM STEPS ARRAY */}
        <div className="flex step-container">
          <div className="step-content-container">
            <RoomList getSelectedRoom={getSelectedRoom} />
          </div>
          {/* BOOKING AMOUNT SECTIONS */}
          <div className="BookingAmountSection">
            <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={numberOfNights}
              selectedRoom={selectedRoom}
            />

            <Button type="primary" disabled={!selectedRoom.length > 0} onClick={saveSelectedRoom}>
              CONTINUE
            </Button>
          

            {/* <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  CONTINUE
                </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
