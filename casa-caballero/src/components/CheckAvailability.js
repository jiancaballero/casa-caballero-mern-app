import { DatePicker, Space, Button } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const CheckAvailability = () => {
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, "days"));
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const getCheckIn = (date) => {
    const checkInCopy = moment(date).clone();
    setCheckInDate(date);
    setCheckOutDate(checkInCopy.add(1, "days"));
  };
  const getCheckOut = (date) => {
    setCheckOutDate(date);
  };

  const navigate = useNavigate();
  const searchRooms = () => {
    const params = {
      checkIn: checkInDate.format("YYYY-MM-DD"),
      checkOut: checkOutDate.format("YYYY-MM-DD"),
      adult: 1,
      child: 0,
    };
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
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
    <>
      <DatePicker
        defaultValue={checkInDate}
        defaultPickerValue={checkInDate}
        format={"dddd, MMM DD, YYYY"}
        disabledDate={disabledCheckInDate}
        allowClear={false}
        onChange={getCheckIn}
        onOpenChange={handleCheckInOpen}
        showToday={false}
      />

      <DatePicker
        value={checkOutDate}
        format={"dddd, MMM DD, YYYY"}
        disabledDate={disabledCheckOutDate}
        allowClear={true}
        onChange={getCheckOut}
        open={checkOutOpen}
        onOpenChange={handleCheckOutOpen}
        showToday={false}
      />
      <Button type="primary" size="large" onClick={searchRooms}>
        Check Availability
      </Button>
    </>
  );
};

export default CheckAvailability;
