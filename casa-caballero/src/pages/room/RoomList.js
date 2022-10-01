import React from "react";
import { useLocation } from "react-router-dom";

const RoomList = () => {
  const search = useLocation().search;
  const checkIn = new URLSearchParams(search).get('checkIn');
  const checkOut = new URLSearchParams(search).get('checkOut');
  const adult = new URLSearchParams(search).get('adult');
  const child = new URLSearchParams(search).get('child');

  return <div>
    <ul>
        <li>check in:{checkIn} </li>
        <li>check out:{checkOut} </li>
        <li>adult:{adult} </li>
        <li>child:{child} </li>
    </ul>
  </div>;
};

export default RoomList;
