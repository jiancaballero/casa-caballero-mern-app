import React, { useState, useEffect } from "react";
import Room from "./Room";
import { Divider } from "antd";
import CheckAvailability from "./CheckAvailability";
const RoomList = ({ allRooms, nights }) => {
  return (
    <div className="room-list">
      <CheckAvailability />
      <Divider/>
      <div className="room-container">
        {allRooms.length > 0 ? (
          allRooms.map((room) => <Room room={room} nights={nights} />)
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
