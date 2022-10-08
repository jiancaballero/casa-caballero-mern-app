import React, { useState } from "react";
import BookingSteps from "../../components/BookingSteps";
import BookingSummary from "../../components/BookingSummary";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
const { Option } = Select;
const GuestDetails = () => {
  // const search = useLocation().search;
  const location = useLocation();
  
  const navigate = useNavigate();
  const room_id = location.state.room_id;
  const room_type = location.state.room_type;
  const rate_type = location.state.rate_type;
  const rate_amount = location.state.rate_amount;
  const checkInStr = location.state.checkIn
  const checkOutStr = location.state.checkOut
  const adult = location.state.adult;
  const child = location.state.childe;
  const room = location.state.room;
  const nights = location.state.nights;
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [form] = Form.useForm();

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
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="63">+63</Option>
      </Select>
    </Form.Item>
  );

  const getInputs = (e) => {
    switch (e.target.id) {
      case "register_first_name":
        setRegistration({ ...registration, firstName: e.target.value });
        break;
      case "register_last_name":
        setRegistration({ ...registration, lastName: e.target.value });
        break;
      case "register_phone":
        setRegistration({ ...registration, phone: e.target.value });
        break;
      case "register_email":
        setRegistration({ ...registration, email: e.target.value });
        break;
    }
  };
  console.log(registration);

  const saveGuestDetails = () => {
    const newParams = {
      checkIn: checkInDate.format("YYYY-MM-DD"),
      checkOut: checkOutDate.format("YYYY-MM-DD"),
      adult: adult,
      child: child,
      room: room,
      nights: nights,
      step: 2,
      room_id:room_id,
      room_type: room_type,
      rate_type: rate_type,
      rate_amount:rate_amount,
      registration,
    };
    
    navigate(
      {
        pathname: `/booking/payment/`,
      },
      { state: newParams }
    );
  };
  return (
    <div className="guest_details_section">
      <div className="container">
        <BookingSteps />
        <div className="flex guest_details_container">
          <div className="guest_left">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="first_name"
                label="First Name"
                onChange={getInputs}
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
              <Form.Item
                name="last_name"
                label="Last Name"
                onChange={getInputs}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                onChange={getInputs}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                onChange={getInputs}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={saveGuestDetails}
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="guest_right">
            <BookingSummary
              checkIn={checkInDate}
              checkOut={checkOutDate}
              adult={adult}
              child={child}
              nights={nights}
              room={room}
              room_type={room_type}
              rate_type={rate_type}
              rate={rate_amount}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
