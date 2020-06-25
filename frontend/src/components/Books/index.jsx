import React from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Layout,
  PageHeader,
  Button,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const { Title, Text } = Typography;
  const { Header } = Layout;
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="My Books"
          extra={[
            <Button key="1" type="primary">
              Add Book
            </Button>,
          ]}
        ></PageHeader>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                  <DeleteOutlined key="delete" />
                </Popconfirm>
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
        <Col xs={24} md={4}>
          <Card
            title="Card title"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <DeleteOutlined key="delete" />
              </Popconfirm>,
            ]}
          ></Card>
        </Col>
      </Row>
    </>
  );
};

export default MyBooks;
