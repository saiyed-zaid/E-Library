import React from "react";

import { PageHeader, Input, Select, Card, Popconfirm, Col, Row } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;
const SearchBooks = () => {
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader ghost={false}>
          <Input.Group compact>
            <Select defaultValue="title">
              <Option value="category">Category</Option>
              <Option value="author">Author</Option>
              <Option value="title">Title</Option>
            </Select>
            <Search
              placeholder="Search books"
              onSearch={(value) => console.log(value)}
              style={{ width: 200 }}
            />
          </Input.Group>
        </PageHeader>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={4}>
          <Card
            title="Cosmos"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
          >
            Here Book Titlee lie
            <Row gutter={24}>
              <Col span={19}>
                <p>Cosos Theory</p>
              </Col>
              <Col span={5}>
                <InfoCircleOutlined style={{ cursor: "pointer" }} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={4}>
          <Card
            title="Cosmos"
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              />
            }
          >
            Here Book Titlee lie
            <Row gutter={24}>
              <Col span={19}>
                <p>Cosos Theory</p>
              </Col>
              <Col span={5}>
                <InfoCircleOutlined style={{ cursor: "pointer" }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SearchBooks;
