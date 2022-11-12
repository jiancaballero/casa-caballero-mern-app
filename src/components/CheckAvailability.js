import { DatePicker, Space, Button } from "antd";
import {
 CalendarFilled
} from '@ant-design/icons';
import moment from "moment";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { withConfirm } from "antd/lib/modal/confirm";
// useDispatch = action, payload
// useSelector = access the state which is in the reducer file
const CheckAvailability = ({setLoader}) => {
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, "days"));
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [adult,setAdult] = useState(1);
  
  const dispatch = useDispatch();
  const getCheckIn = (date) => {
    const checkInCopy = moment(date).clone();
    setCheckInDate(date);
    setCheckOutDate(checkInCopy.add(1, "days"));
  };
  const getCheckOut = (date) => {
    setCheckOutDate(date);
  };
  const getAdult = (e)=>{
    setAdult(e.value);
  }

  const navigate = useNavigate();
  
  const searchRooms = () => {
    setLoader(true);
    try {
      
      axios
        .post("https://casacaballero-be.herokuapp.com/api/rooms", {
          booking_start: checkInDate.format('LL'),
          booking_end: checkOutDate.format('LL'),
          adult:adult
        })
        .then((res) => {
          if (res.status === 200) {
            setLoader(false);
            dispatch({type:"SET_ROOMS_AVAILABLE",payload:res.data})
            const params = {
              checkIn: checkInDate.format("YYYY-MM-DD"),
              checkOut: checkOutDate.format("YYYY-MM-DD"),
              adult: 1,
              child: 0,
              room: 1,
              step: 0,
            };
            navigate({
              pathname: "/booking/room-selection",
              search: `?${createSearchParams(params)}`,
            });
          }
          else{
            console.log("display error 404 page")
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disabledCheckInDate = (current) => {
    // Can not select days before today
    return current < moment().endOf("day");
  };

  const disabledCheckOutDate = (current) => {
    // Can not select days before checkInDate
    return current && current <= checkInDate.endOf("day");
  };

  const handleCheckInOpen = (open) => {
    console.log(open);
    if (!open) {
      setCheckOutOpen(true);
    }
  };
  const handleCheckOutOpen = (open) => {
    setCheckOutOpen(open);
  };
  return (
    <div className="flex date-flex">
      <div className="check-in-cont">
      <p>Check-in</p>
     
      <DatePicker
     
        defaultValue={checkInDate}
        defaultPickerValue={checkInDate}
        format={"ddd, MMM DD, YYYY"}
        disabledDate={disabledCheckInDate}
        allowClear={false}
        onChange={getCheckIn}
        onOpenChange={handleCheckInOpen}
        showToday={false}
      />

      </div>
      <div className="check-out-cont">
      <p>Check-out</p>
      
      <DatePicker
        value={checkOutDate}
        format={"ddd, MMM DD, YYYY"}
        disabledDate={disabledCheckOutDate}
        allowClear={true}
        onChange={getCheckOut}
        open={checkOutOpen}
        onOpenChange={handleCheckOutOpen}
        showToday={false}
      />
      </div>
     
      <Button type="primary" size="medium" onClick={searchRooms}>
        Check Availability
      </Button>
    </div>
  );
};

export default CheckAvailability;
