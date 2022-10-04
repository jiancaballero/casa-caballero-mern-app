import React, { useState, useEffect } from "react";
import Room from "./Room";

const RoomList = ({allRooms}) => {
  
  return (
    <div className="room-list">
      {allRooms.map((room) => (
        <Room roomCategory={room} />
      ))}
    </div>
  );
};

export default RoomList;
