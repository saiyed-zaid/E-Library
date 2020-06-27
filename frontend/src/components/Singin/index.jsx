import React from "react";
import { Link } from "react-router-dom";
import { Alert, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { signin } from "../../redux/ActionApi";

const Signin = (props) => {
  const onHandleSubmit = async (values) => {
    try {
      const response = await props.signinDispatch(values);

      response && props.history.push("/dashboard");
      
    } catch (error) {}
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
      <h1>Signin</h1>
      {props.error && (
        <Alert
          message="Oops!"
          description={props.error}
          type="warning"
          showIcon
          closable
          style={{ width: "26rem", margin: "5px 0" }}
        />
      )}

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onHandleSubmit}
        {...layout}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email / Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/forget-password">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={props.loading}
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    signinDispatch: (postData) => dispatch(signin(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
