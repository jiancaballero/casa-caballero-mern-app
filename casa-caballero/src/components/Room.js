import React, { useState } from "react";
import { Button, Image, Divider, Modal, Tabs } from "antd";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { Tab } from "@mui/joy";
import moment from "moment";
const Room = ({ room, nights }) => {
  // console.log(room.room.map(room=>console.log(room)))

  const navigate = useNavigate();
  const search = useLocation().search;

  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const num_of_room = new URLSearchParams(search).get("room");
  const onChange = (key) => {
    console.log(key);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getBookedRoom = (room_id, room_type, rateType, rateAmount) => {
    console.log(room_id);
    const newParams = {
      checkIn: checkInDate.format("YYYY-MM-DD"),
      checkOut: checkOutDate.format("YYYY-MM-DD"),
      adult: adult,
      child: child,
      room: num_of_room,
      nights: nights,
      step: 1,
      room_type: room_type,
      rate_type: rateType,
      rate_amount: rateAmount,
      room_id: room_id,
    };

    navigate(
      {
        pathname: `/booking/guest-details/`,
      },
      { state: newParams }
    );
  };

  return (
    <div className="">
      <div className="room-card flex">
        <div className="">
          <Image
            preview={{
              visible: false,
            }}
            width={200}
            src={room.room_images[0]}
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
          <div>
            <h1>{room.room_title}</h1>
            <p>{room.room_description}</p>
          </div>

          <Button type="link" size="small" onClick={showModal}>
            View more details
          </Button>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={room.room_category}
          >
            <div className="flex">
              <div>
                <h1>{room.room_title}</h1>
                <p>
                  {room.room_type} | {room.bed.quantity} {room.bed.bed_type}
                </p>
                <p>{room.room_description}</p>
              </div>
              <div>
                <Image
                  preview={{
                    visible: false,
                  }}
                  width={200}
                  src={room.room_images[0]}
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

            <ul>
              {room.amenities.map((amenity) => (
                <li>{amenity}</li>
              ))}
            </ul>
          </Modal>
          <Divider />
          <div>
            {room.rate.map((rate) => (
              <>
                <div className="flex room-rate-container">
                  <div className="rate-type">
                    <p>{rate.rate_type}</p>
                    <p>{rate.rate_description}</p>
                  </div>
                  <div className="room-rate-right">
                    <h3>
                      {rate.rate_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h3>
                    <div className="tax-fees-label">
                      <p>Per night</p>
                      <p>Excluding taxes & fees</p>
                    </div>
                  </div>
                </div>
                <div className="flex book-room-btn">
                  <Button
                    onClick={() => {
                      getBookedRoom(
                        room._id,
                        room.room_title,
                        rate.rate_type,
                        rate.rate_amount
                      );
                    }}
                  >
                    Book Now
                  </Button>
                </div>
                <Divider />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
