import React, { useState } from "react";
import { Button, Image, Divider, Modal } from "antd";
const Room = ({getSelectedRoom}) => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          src={require("../assets/images/room2.jpeg")}
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
        <h1>Room Name</h1>
        <p>Room Description</p>
        <div className="flex room-type-btn">
          <Button>Room Type 1</Button>
          <Button>Room Type 2</Button>
        </div>
        <Button type="link" size="small" onClick={showModal}>
          View more details
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Divider />
        <div>
          <div className="flex room-rate-container">
            <p>Rate Type</p>
            <h3>Amount</h3>
          </div>
          <div className="flex room-rate-container">
            <p>Rate Description</p>
            <div className="rate-desc">
              <p>Per night</p>
              <p>Excluding taxes & fees</p>
            </div>
          </div>
          <div className="flex book-room-btn">
            <Button onClick={()=>{getSelectedRoom("WORKING PROPS")}}>Book Now</Button>
          </div>
        </div>
        <Divider />
      </div>
    </div>
    
  );
};

export default Room;
