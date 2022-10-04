import React from 'react'
import BookingSteps from '../../components/BookingSteps'
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
const GuestDetails = () => {

  const search = useLocation().search;
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const room = new URLSearchParams(search).get("room");
  const bookedRoom = new URLSearchParams(search).get("rmID");
  return (
    <div>
      <BookingSteps/>
      <h1>This is Guest Detail Page</h1>
      <ul>
        <li>{checkInStr}</li>
        <li>{checkOutStr}</li>
        <li>{adult}</li>
        <li>{child}</li>
        <li>{bookedRoom}</li>
      </ul>
    </div>
  )
}

export default GuestDetails