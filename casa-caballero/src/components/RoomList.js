import React, { useState, useEffect } from "react";
import Room from "./Room";

const RoomList = ({allRooms,nights}) => {
  
  return (
    <div className="room-list">
      {allRooms.length>0?allRooms.map((room) => (
        <Room room={room} nights={nights} />
      )):<p>No rooms available.</p>}
     
    </div>
  );
};

export default RoomList;
