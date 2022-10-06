import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { Button, message, Steps, Tooltip } from "antd";
import { UpCircleFilled } from "@ant-design/icons";
import { BackTop } from "antd";
import moment from "moment";
// import axios from "axios";
import RoomList from "../../components/RoomList";
import axios from "axios";
import BookingSummary from "../../components/BookingSummary";
import BookingSteps from "../../components/BookingSteps";
// import RoomList from './pages/room/RoomList';
const Booking = ({allRooms}) => {
  const style = {
    fontSize: "3em",
  };
  // TODO:user must be redirected to the homepage when check in is modifid in url
  const navigate = useNavigate();
  const search = useLocation().search;
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const room = new URLSearchParams(search).get("room");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [bookedRoom, setBookedRoom] = useState([]);
  // const [allRooms, setAllRooms] = useState([]);
  // const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    setNumberOfNights(checkOutDate.diff(checkInDate, "days"));
  }, []);
  
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = (await axios.get("/api/rooms")).data;
        
  //       setAllRooms(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // const getSelectedRoom = (selected) => {
  //   console.log(room);
  //   // setBookedRoom(bookedRoom)
  // };
  // const saveSelectedRoom = () => {
  //   const params = {
  //     checkIn: checkInDate.format("YYYY-MM-DD"),
  //     checkOut: checkOutDate.format("YYYY-MM-DD"),
  //     adult: adult,
  //     child: child,
  //     room:room,
  //     step: 1,
      
  //   };
  //   navigate({
  //     pathname: "/booking/guest-details",
  //     search: `?${createSearchParams(params)}`,
  //   });
  // };

  return (
    <div className="BookingPage">
      <div className="container">
        <BookingSteps />
        {/* INSERT CONTENT FROM STEPS ARRAY */}
        <div className="flex step-container">
          <div className="step-content-container">
            <RoomList allRooms={allRooms} nights={numberOfNights}/>
          </div>
          {/* BOOKING AMOUNT SECTIONS */}
          <div className="BookingAmountSection">
            <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={numberOfNights}
              bookedRoom={bookedRoom}
              room={room}
            />

            {/* <Button
              type="primary"
              disabled={!bookedRoom.length > 0}
              onClick={saveSelectedRoom}
            >
              CONTINUE
            </Button> */}

            {/* <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  CONTINUE
                </Button> */}
          </div>
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
