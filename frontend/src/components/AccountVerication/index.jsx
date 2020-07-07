import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { sendVerification, verifyAccount } from "../../redux/ActionApi";

const AccountVerification = (props) => {
  const [codeSend, hasCodeSent] = useState(false);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");

  const dispatch = useDispatch();

  const globalState = useSelector((state) => state.global);

  const onHandleSubmit = async () => {
    //verify passcode api call
    dispatch(verifyAccount({ passcode, username }));
    //const response = await dispatch(signin(values));
    //response && props.history.push("/");
  };

  const handleSendVerificationCode = () => {
    dispatch(sendVerification({ username }));
    //send verification code
    hasCodeSent(true);
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
      <h1>Account Verification</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        {...layout}
      >
        {!codeSend && (
          <Form.Item>
            <Input
              name="username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email / Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
        )}
        {codeSend && (
          <Form.Item>
            <Input.Password
              name="passcode"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Verification Code"
              onChange={(e) => setPasscode(e.target.value)}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={
              codeSend
                ? () => onHandleSubmit()
                : () => handleSendVerificationCode()
            }
          >
            {codeSend ? "Verify" : "Send Verification Code"}
          </Button>
          {"  "}
          {codeSend && (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => handleSendVerificationCode()}
            >
              Send Again
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default withRouter(AccountVerification);
