import React from "react";
import { Steps, Button, Form, Input, Select, Result } from "antd";
import {
  UserOutlined,
  CompassOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Axios from "axios";

import { connect } from "react-redux";

import { signup, verifyAccount } from "../../redux/ActionApi";

const { Step } = Steps;
const { Option } = Select;

const ActionButtons = ({ steps, current, next, prev }) => {
  return (
    <div className="steps-action">
      {current < steps.length - 1 && (
        <Button type="primary" htmlType="submit" onClick={() => next()}>
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
  );
};

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      registrationFields: [],
      roleFields: [],
      personalDetailsFields: [],
      bookCategories: [],
      verificationFields: [],
      hasError: false,
      resultStatus: "info",
      userData: {},
    };

    this.steps = [
      {
        title: "Registration",
        content: "Registration Form",
        icon: <UserOutlined />,
      },
      {
        title: "Role, Country",
        content: "Choose Your Role",
        icon: <CompassOutlined />,
      },
      {
        title: "Personal Details",
        content: "Enter Your Personal Details",
        icon: <InfoCircleOutlined />,
      },
      {
        title: "Verification",
        content: "We have sent you verification code",
        icon: <CheckCircleOutlined />,
      },
    ];

    this.layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
    };

    this.userData = {};
  }

  async componentDidMount() {
    const bookCategories = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/book/categories`
    );

    this.setState({
      bookCategories: bookCategories.data.categories,
    });
  }

  handleRegistrationChange = (event) => {
    this.setState({
      registrationFields: event,
    });
  };

  handleRoleChange = (event) => {
    this.setState({
      roleFields: event,
    });
  };

  handlePersonalDetailsChange = (event) => {
    this.setState({
      personalDetailsFields: event,
    });
  };

  next = () => {
    var currentStep;
    let hasError = false;

    if (this.state.current === 0) {
      if (this.state.registrationFields.length > 0) {
        this.state.registrationFields.forEach((field) => {
          if (field.errors.length > 0 || !field.touched) {
            hasError = true;
          }
        });

        if (!hasError) {
          currentStep = this.state.current + 1;
          this.setState({
            current: currentStep,
          });
        }
      }
    }

    if (this.state.current === 1) {
      if (this.state.roleFields.length > 0) {
        this.state.roleFields.forEach((field) => {
          if (field.errors.length > 0 || !field.touched) {
            hasError = true;
          }
        });

        if (!hasError) {
          currentStep = this.state.current + 1;
          this.setState({
            current: currentStep,
          });
        }
      }
    }

    if (this.state.current === 2) {
      if (this.state.personalDetailsFields.length > 0) {
        this.state.personalDetailsFields.forEach((field) => {
          if (field.errors.length > 0 || !field.touched) {
            hasError = true;
          }
        });

        if (!hasError) {
          currentStep = this.state.current + 1;
          this.setState({
            current: currentStep,
          });
        }
      }

      this.state.registrationFields.forEach((field) => {
        this.userData[field.name[0]] = field.value;
      });

      this.state.roleFields.forEach((field) => {
        this.userData[field.name[0]] = field.value;
      });

      this.state.personalDetailsFields.forEach((field) => {
        this.userData[field.name[0]] = field.value;
      });

      console.log("userdata", this.userData);
      this.props.signupDispatch(this.userData);
      this.setState({
        userData: this.userData,
      });
      //Call
    }
  };

  prev = () => {
    const currentStep = this.state.current - 1;

    this.setState({
      current: currentStep,
    });
  };

  handleVerifyAccountChange = (event) => {
    this.setState({
      verificationFields: event,
    });
  };

  handleVerifyAccount = (event) => {
    const data = {};

    this.state.verificationFields.forEach((field) => {
      data[field.name[0]] = field.value;
      data._id = this.props.data.user._id;
    });

    this.props.verificationDispatch(data);
  };

  render() {
    return (
      <>
        <h1>Signup</h1>
        <Steps current={this.state.current}>
          {this.steps.map((step, index) => {
            return <Step key={index} title={step.title} icon={step.icon} />;
          })}
        </Steps>

        <div className="steps-content">
          {this.state.current === 0 && (
            <Form
              {...this.layout}
              form={this.form}
              name="basic"
              layout="vertical"
              onFieldsChange={(changedFields, allFields) => {
                this.handleRegistrationChange(allFields);
              }}
            >
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

              <ActionButtons
                steps={this.steps}
                current={this.state.current}
                next={this.next}
                prev={this.prev}
              />
            </Form>
          )}

          {this.state.current === 1 && (
            <Form
              {...this.layout}
              name="basic"
              layout="vertical"
              onFieldsChange={(changedFields, allFields) => {
                this.handleRoleChange(allFields);
              }}
            >
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
                  <Option value="india">India</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="usa">USA</Option>
                </Select>
              </Form.Item>

              <ActionButtons
                steps={this.steps}
                current={this.state.current}
                next={this.next}
                prev={this.prev}
              />
            </Form>
          )}

          {this.state.current === 2 && (
            <Form
              {...this.layout}
              name="basic"
              layout="vertical"
              onFieldsChange={(changedFields, allFields) => {
                this.handlePersonalDetailsChange(allFields);
              }}
            >
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
                  {this.state.bookCategories.map((category) => {
                    return (
                      <Option value={category._id}>{category.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <ActionButtons
                steps={this.steps}
                current={this.state.current}
                next={this.next}
                prev={this.prev}
              />
            </Form>
          )}

          {this.state.current === 3 && (
            <Result
              status={
                this.props.data && this.props.data.isVerified
                  ? "success"
                  : "info"
              }
              title={
                this.props.data && this.props.data.isVerified
                  ? "Account Verified Successfully"
                  : "Please Check Your Email For Further Instructions!"
              }
              subTitle={
                this.props.data && this.props.data.isVerified
                  ? "Please Login With Your Credentials"
                  : "We have sent you 6-digit verification code Please Check Your Email."
              }
              extra={
                this.props.data && this.props.data.isVerified
                  ? [
                      <Button
                        type="dashed"
                        key="console"
                        onClick={() => this.props.history.push("/signin")}
                      >
                        Login
                      </Button>,
                    ]
                  : [
                      <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{
                          span: 4,
                        }}
                        name="basic"
                        layout="vertical"
                        onFieldsChange={(changedFields, allFields) => {
                          this.handleVerifyAccountChange(changedFields);
                        }}
                      >
                        <Form.Item
                          label="Verification Code"
                          name="passcode"
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
                      <Button
                        type="primary"
                        key="console"
                        onClick={this.handleVerifyAccount}
                      >
                        Verify
                      </Button>,
                      <Button key="buy">Send Again</Button>,
                    ]
              }
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupDispatch: (postData) => dispatch(signup(postData)),
    verificationDispatch: (postData) => dispatch(verifyAccount(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
