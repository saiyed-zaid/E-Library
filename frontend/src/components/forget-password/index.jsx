import React from "react";
import { Link } from "react-router-dom";
import { Layout, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const ForgetPassword = () => {
  const { Content } = Layout;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 10 }}
    >
      <div
        className="site-layout-background"
        style={{ padding: 10, minHeight: 380 }}
      >
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
      </div>
    </Content>
  );
};

export default ForgetPassword;
