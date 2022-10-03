import React, { useState } from "react";
import { Collapse, Divider, Modal, Button } from "antd";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
const RoomSelected = (props) => {
  const checkIn = props.checkIn;
  const checkOut = props.checkOut;
  const checkInClone = checkIn.clone();
  const checkOutFormat = checkOut.format("ddd, MMM DD, YYYY").toString();
  const checkInFormat = checkIn.format("ddd, MMM DD, YYYY").toString();
  const nightStr = props.nights + " " + "Night/s";
  const datesBetween = [];
  while (checkInClone.isBefore(checkOut)) {
    datesBetween.push(checkInClone.format("MMM DD, YYYY"));
    checkInClone.add(1, "days");
  }

  const { Panel } = Collapse;
  const onChange = (key) => {
    return key;
  };

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
    //TODO:create an edit and delete functionality
    <div>
      <Collapse accordion defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Room 1" key="1">
          <div className="room-inital-details">
            <h3>
              {checkInFormat} - {checkOutFormat}
            </h3>
            <h3>
              {props.adult} Adult | {props.child} Child
            </h3>
            <Button type="link" size="small" onClick={showModal}>
              Edit Booking
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
          </div>

          <div className="flex room-select-container">
            <h3>Room Name</h3>
            <h3>Amount</h3>
          </div>
          <div className="room-rate">
            <h3>Standard Rate</h3>
            <Collapse ghost>
              <Panel header={nightStr} key="1">
                <div className="flex night-breakdown">
                  <div>
                    {datesBetween.map((date) => (
                      <p>{date}</p>
                    ))}
                  </div>
                  <div>
                    {datesBetween.map((date) => (
                      <p>Amount</p>
                    ))}
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="flex taxes-fees">
            <h3>Taxes & Fees</h3>

            <h3>Amount</h3>
          </div>
          <Collapse ghost>
            <Panel header="More Details" key="1">
              <div className="flex service-charge">
                <p>Service Charge (10%)</p>
                <p>Amount</p>
              </div>
              <div className="flex VAT-amount">
                <p>VAT (12%)</p>
                <p>Amount</p>
              </div>
              <div className="flex local-tax">
                <p>Local Tax(1.50%)</p>
                <p>Amount</p>
              </div>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
      <Button type="primary">ADD A ROOM</Button>
      <Divider />
      <div className="flex booking-total-amount">
        <h1>Total Amount</h1>
        <h1>P 6,000.00</h1>
      </div>
    </div>
  );
};

export default RoomSelected;
