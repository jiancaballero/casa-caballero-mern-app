import { DatePicker, Space, Button } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const CheckAvailability = () => {
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, "days"));
  const [checkOutOpen,setCheckOutOpen] = useState(false)
  // const [numberOfNights, setNumberOfNights] = useState(0);
  const getCheckIn = (date) => {
    const checkInCopy = moment(date).clone();
    setCheckInDate(date);
    setCheckOutDate(checkInCopy.add(1, "days"));
    setCheckOutOpen(true)
  };
  const getCheckOut = (date) => {
    setCheckOutOpen(false)
  };
  const navigate = useNavigate();
  const params = {
    checkIn: checkInDate.format("YYYY-MM-DD"),
    checkOut: checkOutDate.format("YYYY-MM-DD"),
    adult: 1,
    child: 0,
  };
  const searchRooms = () =>
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
  // const computeNumberOfNights = ()=>{
  //   setNumberOfNights(checkOutDate.diff(checkInDate,'days'))
  // }

  const disabledCheckInDate = (current) => {
    // Can not select days before today
    return moment().add(-1, "days") >= current;
  };

  const disabledCheckOutDate = (current) => {
    // Can not select days before today
    return current && current < checkInDate.endOf("day");
  };
  return (
    <>
      <DatePicker
        defaultValue={checkInDate}
        defaultPickerValue={checkInDate}
        format={"dddd, MMM DD, YYYY"}
        disabledDate={disabledCheckInDate}
        allowClear={false}
        onChange={getCheckIn}
      />

      <DatePicker
        value={checkOutDate}
        format={"dddd, MMM DD, YYYY"}
        disabledDate={disabledCheckOutDate}
        allowClear={false}
        onChange={getCheckOut}
        open={checkOutOpen}
        
      />
      <Button type="primary" size="large" onClick={searchRooms}>
        Check Availability
      </Button>
    </>
  );
};

export default CheckAvailability;
