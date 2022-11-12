import React, { useState, useEffect } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Alert,
  Spin,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import moment from "moment";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

const ManageBooking = () => {
  const [form] = Form.useForm();
  const [bkCode, setBkCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  const [hasError, setHasError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [noBookingError, setNoBookingError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const onFinish = (values) => {
    return values;
  };
  const getBkCode = (e) => {
    if (e.target.value !== "") {
      setDisable(false);
      setBkCode(e.target.value);
    } else {
      setDisable(true);
    }
  };

  const getBooking = () => {
    setLoading(true);
    try {
      axios
        .get(`https://casacaballero-be.herokuapp.com/api/bookings/${bkCode}`)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setHasError(false);
            setBookingDetails(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          setEmailSent(false);
          setBookingDetails({});
          setHasError(true);
          setNoBookingError(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = () => {
    setLoading(true);
    try {
      axios
        .put("https://casa-caballero-be.herokuapp.com/api/bookings/cancel", {
          bk_code: bkCode,
          email: bookingDetails.guest_details.email,
        })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setEmailSent(true);
            setSuccessMessage(res.data.message);
            setBookingDetails({});
          } else {
            console.log("display error 404 page");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "# of nights",
      dataIndex: "nights",
      key: "nights",
    },
    {
      title: "Room Type",
      dataIndex: "rmType",
      key: "rmType",
    },
    {
      title: "Room Name",
      dataIndex: "rmName",
      key: "rmName",
    },
    {
      title: "Rate Type",
      dataIndex: "rtType",
      key: "rtType",
    },
    {
      title: "Rate Amount",
      dataIndex: "rtAmount",
      key: "rtAmount",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = bookingDetails?.status === "cancelled" ? "volcano" : "green";
            
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, cancel) =>
        bookingDetails?.status !== "cancelled" && (
          <Button onClick={cancelBooking}>Cancel Booking</Button>
        ),
    },
  ];

  const data = Object.keys(bookingDetails).length > 0 && [
    {
      key: "1",
      name:
        bookingDetails?.guest_details.firstName +
        " " +
        bookingDetails?.guest_details.lastName,
      checkIn: new Date(bookingDetails?.check_in).toLocaleDateString(
        undefined,
        { year: "numeric", month: "long", day: "numeric" }
      ),
      checkOut: new Date(bookingDetails?.check_out).toLocaleDateString(
        undefined,
        { year: "numeric", month: "long", day: "numeric" }
      ),
      nights: bookingDetails?.nights,
      rmType: bookingDetails?.room.room_type,
      rmName: bookingDetails?.room.room_title,
      rtType: bookingDetails?.room_rate.type,
      rtAmount: bookingDetails?.room_rate.amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      total:
        bookingDetails?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " (tax included) ",
      tags: [bookingDetails?.status],
    },
  ];

  return (
    <Spin tip="Processing your request" spinning={loading}>
      <div className="container">
        {hasError && <ErrorMessage message={noBookingError} />}
        {emailSent && <SuccessMessage message={successMessage} />}
        <Alert
          message="Please check your booking code in your email."
          type="info"
        />
        <br></br>
        <br></br>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            onChange={getBkCode}
            name="bk_code"
            label="Booking Code"
            rules={[
              {
                required: true,
                message: "Please input your booking code ",
                whitespace: true,
              },
            ]}
          >
            <Input className="booking-input" />
          </Form.Item>
          <Button
          type="primary"
          htmlType="submit"
          onClick={getBooking}
          disabled={disable}
          className="booking-code-btn"
        >
          Continue
        </Button>
        
         
        </Form>
       
        <Table columns={columns} dataSource={data} />;
      </div>
    </Spin>
  );
};

export default ManageBooking;
