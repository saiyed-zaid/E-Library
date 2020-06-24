import React, { useState } from "react";
import { Layout, Steps, Button, Form, Input, Select, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Signup = (props) => {
  const { Content } = Layout;
  const { Step } = Steps;
  const { Option } = Select;
  const steps = [
    {
      title: "Registration",
      content: "Registration Form",
    },
    {
      title: "Role, Country",
      content: "Choose Your Role",
    },
    {
      title: "Personal Details",
      content: "Enter Your Personal Details",
    },
    {
      title: "Verification",
      content: "We have sent you verification code",
    },
  ];
  const [current, setCurrent] = useState(0);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  function next() {
    const currentStep = current + 1;
    setCurrent(currentStep);
  }

  function prev() {
    const currentStep = current - 1;
    setCurrent(currentStep);
  }
  return (
    <>
      <h1>Signup</h1>
      <Steps current={current}>
        {steps.map((step) => {
          return <Step title={step.title} icon={<UserOutlined />} />;
        })}
      </Steps>

      <div className="steps-content">
        {current === 0 && (
          <Form {...layout} name="basic" layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="passwordConfirmation"
              rules={[
                {
                  required: true,
                  message: "Please input confirm password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        )}

        {current === 1 && (
          <Form {...layout} name="basic" layout="vertical">
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select placeholder="Select Role" allowClear>
                <Option value="reader">Reader</Option>
                <Option value="writer">Writer</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Country" allowClear>
                <Option value="reader">India</Option>
                <Option value="writer">Canada</Option>
              </Select>
            </Form.Item>
          </Form>
        )}

        {current === 2 && (
          <Form {...layout} name="basic" layout="vertical">
            <Form.Item
              label="Firstname"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="intrest"
              label="Intrest"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select your books of interest" allowClear>
                <Option value="1">Comics</Option>
                <Option value="2">Science</Option>
              </Select>
            </Form.Item>
          </Form>
        )}

        {current === 3 && (
          <Result
            status="success"
            title="Account Verified Successfully!"
            subTitle="We have sent you 6-digit verification code Please Check Your Email."
            extra={[
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{
                  span: 4,
                }}
                name="basic"
                layout="vertical"
              >
                <Form.Item
                  label="Verification Code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please input verification code!",
                    },
                  ]}
                  style={{ alignItems: "center" }}
                >
                  <Input />
                </Form.Item>
              </Form>,
              <Button type="primary" key="console">
                Verify
              </Button>,
              <Button key="buy">Send Again</Button>,
            ]}
          />
        )}
      </div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => alert("Processing complete!")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default Signup;
