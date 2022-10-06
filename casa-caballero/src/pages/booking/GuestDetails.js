import React, { useState } from "react";
import BookingSteps from "../../components/BookingSteps";
import BookingSummary from "../../components/BookingSummary";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
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
  const search = useLocation().search;
  const navigate = useNavigate();
  const checkInStr = new URLSearchParams(search).get("checkIn");
  const checkOutStr = new URLSearchParams(search).get("checkOut");
  const adult = new URLSearchParams(search).get("adult");
  const child = new URLSearchParams(search).get("child");
  const room = new URLSearchParams(search).get("room");
  const bookedRoom = new URLSearchParams(search).get("rmId");
  const rate = new URLSearchParams(search).get("rate_type");
  const nights = new URLSearchParams(search).get("nights");
  const checkInDate = moment(checkInStr, "YYYY-MM-DD");
  const checkOutDate = moment(checkOutStr, "YYYY-MM-DD");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    return values
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

  const saveGuestDetails = ()=>{
    const newParams = {
      checkIn: checkInDate.format("YYYY-MM-DD"),
      checkOut: checkOutDate.format("YYYY-MM-DD"),
      adult: adult,
      child: child,
      room:room,
      nights:nights,
      step:2,
      rmId: room,
      rate_type: rate,
    };
   
    navigate({
      pathname: `/booking/payment/`,
      search: `${createSearchParams(newParams)}`,
    });
  }
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
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
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
                <Button type="primary" htmlType="submit" onClick={saveGuestDetails}>
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
              bookedRoom={bookedRoom}
              room={room}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
