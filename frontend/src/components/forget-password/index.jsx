import React from "react";

import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { forgetPassword } from "../../redux";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    dispatch(forgetPassword(values));
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <>
      <h1>Forget Password</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          extra="Enter your email address above and we will send you instructions on how to reset your password."
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email / Username"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgetPassword;
