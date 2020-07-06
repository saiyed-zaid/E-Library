import React from "react";

import { withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Card, Col, Row, Typography, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { updatePlan } from "../../redux/ActionApi";

const { Text, Title } = Typography;

const Plans = (props) => {
  const authUser = useSelector((state) => state.authUser.authUser);

  const dispatch = useDispatch();

  const handlePlanSelection = (plan) => {
    const response = dispatch(
      updatePlan({ plan }, authUser._id, authUser.token)
    );

    setTimeout(() => response && props.history.push("/"), 300);
  };
  return (
    <>
      <div className="site-card-wrapper">
        <Title level={3}>Pricing</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              title="Basic"
              bordered={true}
              style={{ border: "1px solid #1890ff" }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handlePlanSelection("basic")}
                  style={{ display: "block" }}
                >
                  Select
                </Button>,
                ,
              ]}
            >
              <p>Free</p>
              <Row gutter={24}>
                <Col span={24}>
                  <CheckOutlined />
                  {"  "}
                  <Text type="secondary">Access 1 Book/Month</Text>
                </Col>
                <Col span={24}>
                  <CheckOutlined />
                  {"  "}
                  <Text type="secondary">1 Book/Time</Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title="Standard"
              bordered={true}
              style={{ border: "1px solid #1890ff" }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handlePlanSelection("standard")}
                  style={{ display: "block" }}
                >
                  Select
                </Button>,
              ]}
            >
              <p>$5 / month</p>
              <Row gutter={24}>
                <Col span={24}>
                  <CheckOutlined /> {"  "}
                  <Text type="secondary">Read/Access 5 Books/Month</Text>
                </Col>
                <Col span={24}>
                  <CheckOutlined />
                  <Text type="secondary">3 Book/Time</Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title="Prime"
              bordered={true}
              style={{ border: "1px solid #1890ff" }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handlePlanSelection("prime")}
                  style={{ display: "block" }}
                >
                  Select
                </Button>,
              ]}
            >
              <p>$10 / month</p>
              <Row gutter={24}>
                <Col span={24}>
                  <CheckOutlined />
                  {"  "}
                  <Text type="secondary">Read/Access 15 Books/Month</Text>
                </Col>
                <Col span={24}>
                  <CheckOutlined />
                  {"  "}
                  <Text type="secondary">7 Book/Time</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withRouter(Plans);
