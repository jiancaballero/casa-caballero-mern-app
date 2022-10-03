import React from "react";
import Room from "./Room";

const RoomList = ({getSelectedRoom}) => {
  return (
    <div className="room-list">
      <Room getSelectedRoom={getSelectedRoom} />
     
    </div>
  );
};

export default RoomList;
