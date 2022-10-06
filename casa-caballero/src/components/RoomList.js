import React, { useState, useEffect } from "react";
import Room from "./Room";

const RoomList = ({allRooms,nights}) => {
  
  return (
    <div className="room-list">
      {allRooms.map((room) => (
        <Room room={room} nights={nights} />
      ))}
    </div>
  );
};

export default RoomList;
