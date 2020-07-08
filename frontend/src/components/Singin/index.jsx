import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { GoogleLogin } from "react-google-login";

import { useDispatch, useSelector } from "react-redux";

import { signin, socialLogin } from "../../redux/ActionApi";
import { CLIENT_ID } from "../../redux/const";

const Signin = (props) => {
  const dispatch = useDispatch();

  const globalState = useSelector((state) => state.global);

  const onHandleSubmit = async (values) => {
    try {
      const response = await dispatch(signin(values, props.history));
      response && props.history.push("/");
    } catch (error) {}
  };

  const responseGoogle = async (response) => {
    try {
      if (response.googleId) {
        /* dispatch(Login(response.profileObj));
        props.history.push("/app/"); */

        const res = await dispatch(socialLogin(response.profileObj));

        res && props.history.push("/");
      }
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <NavLink className="login-form-forgot" to="/forget-password">
            Forgot password
          </NavLink>
        </Form.Item>

        <Form.Item>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login With Goodle"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={globalState.loading}
          >
            Log in
          </Button>
          Or <NavLink to="/signup">register now!</NavLink>
        </Form.Item>
      </Form>
    </>
  );
};

/* const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    signinDispatch: (postData) => dispatch(signin(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
 */

export default withRouter(Signin);
