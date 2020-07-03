import React from "react";

import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

import { resetPassword } from "../../redux";
import { withRouter } from "react-router-dom";

const ResetPassword = (props) => {
  const dispatch = useDispatch();

  const resetPasswordToken = props.match.params.token;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    dispatch(resetPassword({ password: values.password, resetPasswordToken }));
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
      <h1>Reset Password</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        {...layout}
        layout="vertical"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password",
            },
            {
              min: 6,
              message: "Min. 6 character required",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input confirm password",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
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
export default withRouter(ResetPassword);
