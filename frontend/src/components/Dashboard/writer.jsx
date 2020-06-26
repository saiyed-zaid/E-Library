import React from "react";
import { Row, Col, Card, Layout, Statistic } from "antd";
import {
  LikeTwoTone,
  DislikeTwoTone,
  BookTwoTone,
  LikeOutlined,
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
        <h1>Top 3 Liked Books</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <h1>Top 3 Reading Books</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              bordered={true}
              cover={
                <img
                  alt="example"
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                />
              }
            >
              <p>Cosos Theory</p>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="Read"
                    value={125}
                    prefix={<BookTwoTone />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Like" value={67} prefix={<LikeTwoTone />} />
                </Col>

                <Col span={8}>
                  <Statistic
                    title="Dislike"
                    value={12}
                    prefix={<DislikeTwoTone />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
