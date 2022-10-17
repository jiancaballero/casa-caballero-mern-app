import React, { useState } from "react";
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
  Table
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
  const onFinish = (values) => {
    return values;
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const getBkCode = (e) => {
    setBkCode(e.target.value);
  };
  const getBooking = () => {
    setLoading(true);
    try {
      axios
        .get(`http://localhost:8080/api/bookings/${bkCode}`)
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
        .put("http://localhost:8080/api/bookings/cancel", {
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

  return (
    <Spin tip="Processing your request" spinning={loading}>
      <div className="guest_left">
        {hasError && (
          <ErrorMessage message={noBookingError}/>
         
        )}
         {emailSent && (
          <SuccessMessage message={successMessage}/>
         
        )}

        <p>Please check your booking code in your email.</p>

        <Form
          {...formItemLayout}
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
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={getBooking}>
              Continue
            </Button>
            {Object.keys(bookingDetails).length > 0 && (
              <ul>
                <li>
                  Name:
                  {bookingDetails?.guest_details.firstName +
                    " " +
                    bookingDetails?.guest_details.lastName}
                </li>
                <li>
                  Check-in:
                  {new Date(bookingDetails?.check_in).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </li>
                <li>
                  Check-out:
                  {new Date(bookingDetails?.check_out).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </li>
                <li>Number of nights:{bookingDetails?.nights}</li>
                <li>Adult:{bookingDetails?.adult}</li>
                <li>Room Type:{bookingDetails?.room.room_type}</li>
                <li>Room Name:{bookingDetails?.room.room_title}</li>
                <li>Status:{bookingDetails?.status}</li>
                <li>Rate Type:{bookingDetails?.room_rate.type}</li>
                <li>
                  Rate Amount:
                  {bookingDetails?.room_rate.amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </li>
                <li>
                  Total Price:
                  {bookingDetails?.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  (tax included)
                </li>

                <li>
                  {bookingDetails.status !== "cancelled" && (
                    <Button onClick={cancelBooking}>Cancel Booking</Button>
                  )}
                </li>
              </ul>
            )}
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default ManageBooking;
