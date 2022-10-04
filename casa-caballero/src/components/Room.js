import React, { useState } from "react";
import { Button, Image, Divider, Modal } from "antd";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

const Room = ({ roomCategory }) => {
  // console.log(room.room.map(room=>console.log(room)))
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [bookedRoom,setBookedRoom] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const currentLoc = useLocation();
  const getBookedRoom = (rmID) => {
    const params = {
      ...currentLoc,
      rmID,
    };
    navigate({
      pathname: "/guest_details/room-selection",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="flex room-container">
      {/* ROOM IMAGES */}
      <div>
        <Image
          preview={{
            visible: false,
          }}
          width={200}
          // src={room.room_images[0]}
          onClick={() => setVisible(true)}
        />

        <div
          style={{
            display: "none",
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            <Image src={require("../assets/images/room2.jpeg")} />
            <Image src={require("../assets/images/room2.jpeg")} />
            <Image src={require("../assets/images/room2.jpeg")} />
          </Image.PreviewGroup>
        </div>
      </div>
      {/* ROOM INFO */}
      <div className="room-info">
        <h1>{roomCategory.name}</h1>
        <p>{roomCategory.description}</p>
        {roomCategory.rooms.map((room) => (
          <Button>{room.room_title}</Button>
        ))}
        <Button type="link" size="small" onClick={showModal}>
          View more details
        </Button>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          // title={room.room_category}
        >
          <div className="flex">
            <div>
              {/* <h1>{room.room_title}</h1> */}
              <p>
                {/* {room.room_type} | {room.bed.quantity} {room.bed.bed_type} */}
              </p>
              {/* <p>{room.room_description}</p> */}
            </div>
            <div>
              <Image
                preview={{
                  visible: false,
                }}
                width={200}
                // src={room.room_images[0]}
                onClick={() => setVisible(true)}
              />

              <div
                style={{
                  display: "none",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  <Image src={require("../assets/images/room2.jpeg")} />
                  <Image src={require("../assets/images/room2.jpeg")} />
                  <Image src={require("../assets/images/room2.jpeg")} />
                </Image.PreviewGroup>
              </div>
            </div>
          </div>

          <Divider />

          {/* <ul>
            {room.amenities.map((amenity) => (
              <li>{amenity}</li>
            ))}
          </ul> */}
        </Modal>
        <Divider />
        <div>
          {/* {room.rate.map((rate) => (
            <>
              <div className="flex room-rate-container">
                <div>
                  <p>{rate.rate_type}</p>
                  <p>{rate.rate_description}</p>
                </div>
                <div className="room-rate-right">
                  <h3>{rate.rate_amount}</h3>
                  <p>Per night</p>
                  <p>Excluding taxes & fees</p>
                </div>
              </div>
              <div className="flex book-room-btn">
                <Button onClick={getBookedRoom(room._id)}>Book Now</Button>
              </div>
              <Divider />
            </>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Room;
