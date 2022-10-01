import { DatePicker, Space, Button } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const CheckAvailability = () => {
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, "days"));
  // const [numberOfNights, setNumberOfNights] = useState(0);
  const getCheckIn = (date) => {
    setCheckInDate(date);
  };
  const getCheckOut = (date) => {
    setCheckOutDate(date);
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
    return current && current < moment().endOf("day");
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
        defaultValue={checkOutDate}
        defaultPickerValue={checkOutDate}
        format={"dddd, MMM DD, YYYY"}
        disabledDate={disabledCheckOutDate}
        allowClear={false}
        onChange={getCheckOut}
      />
      <Button type="primary" size="large" onClick={searchRooms}>
        Check Availability
      </Button>
    </>
  );
};

export default CheckAvailability;
