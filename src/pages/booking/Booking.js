import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { Button, message, Steps, Tooltip, Divider } from "antd";
import { UpCircleFilled } from "@ant-design/icons";
import { BackTop } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

import RoomList from "../../components/RoomList";

import BookingSummary from "../../components/BookingSummary";
import BookingSteps from "../../components/BookingSteps";
// import RoomList from './pages/room/RoomList';
const Booking = ({ allRooms }) => {
  const style = {
    fontSize: "3em",
  };
  // TODO:user must be redirected to the homepage when check in is modifid in url
  const navigate = useNavigate();
  const search = useLocation().search;
  const location = useLocation();
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const room = new URLSearchParams(search).get("room");

  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [bookedRoom, setBookedRoom] = useState([]);
  const availableRooms = useSelector((state) => state.roomsAvailable);
  console.log(availableRooms);
  // const [allRooms, setAllRooms] = useState([]);
  // const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    if (!search.length > 0) {
      navigate({ pathname: "/" }, { state: location });
    }
    setNumberOfNights(checkOutDate.diff(checkInDate, "days"));
  }, []);

  return (
    <div className="">
      <div className="BookingPage">
        <div className="container">
          <div className="room-selection-header">
            <h1>choose your room</h1>
          </div>
        </div>
      </div>

      <div className="flex step-container">
        <div className="booking-filters">
          <h3>your stay</h3>
          <div></div>
          <Divider />
        </div>
        <div className="step-content-container">
          <RoomList allRooms={availableRooms} nights={numberOfNights} />
        </div>
      </div>
      <BackTop>
        <Tooltip title="Back to top">
          <UpCircleFilled style={style} />
        </Tooltip>
      </BackTop>
    </div>
  );
};

export default Booking;
