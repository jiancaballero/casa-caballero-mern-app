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
} from "antd";
import axios from "axios";

const ManageBooking = () => {
  const [form] = Form.useForm();
  const [bkCode, setBkCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});

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
    try {
      axios.get(`http://localhost:8080/api/bookings/${bkCode}`).then((res) => {
        if (res.status === 200) {
          setBookingDetails(res.data);
        } else {
          console.log("display error 404 page");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = () => {
    try {
      axios
        .put("http://localhost:8080/api/bookings/cancel", {bk_code:bkCode})
        .then((res) => {
          if (res.status === 200) {
            console.log("Booking Canclled");
          } else {
            console.log("display error 404 page");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="guest_left">
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
                message: "Please input your first name",
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
                <li>Check-in:{bookingDetails?.check_in}</li>
                <li>Check-out:{bookingDetails?.check_out}</li>
                <li>Adult:{bookingDetails?.adult}</li>
                <li>Room Type:{bookingDetails?.room.room_type}</li>
                <li>Room Name:{bookingDetails?.room.room_title}</li>
                <li>Status:{bookingDetails?.status}</li>
              

                <li>
                  {bookingDetails.status !=='cancelled' &&
                      (<Button onClick={cancelBooking}>Cancel Booking</Button>)
                  }
                
                </li>
              </ul>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ManageBooking;