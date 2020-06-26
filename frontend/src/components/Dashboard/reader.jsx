import React from "react";
import { Row, Col, Card, Layout, Statistic } from "antd";
import {
  LikeTwoTone,
  DislikeTwoTone,
  BookTwoTone,
  LikeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function Dashboard(props) {
  const { Content } = Layout;

  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  !isLoggedIn && props.history.push("/signin");

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
      <div className="site-card-wrapper">
        <h1>Contiue Reading...</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="site-card-wrapper">
        <h1>Favourite Books</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="site-card-wrapper">
        <h1>Later Read Book List</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              title="Cosmos"
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <Row gutter={24}>
                <Col span={20}>
                  <p>Cosos Theory</p>
                </Col>
                <Col span={4}>
                  <InfoCircleOutlined style={{ cursor: "pointer" }} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
