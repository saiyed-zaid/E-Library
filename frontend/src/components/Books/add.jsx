import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { insertData } from "../../redux/ActionApi";

import { PageHeader, Button, Form, Radio, Input, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const Add = (props) => {
  const authUser = useSelector((state) => state.authUser.authUser);

  const dispatch = useDispatch();

  const { Dragger } = Upload;

  const handleSubmit = (data) => {
    const response = dispatch(
      insertData(data, authUser.user.token, authUser.user._id)
    );
    
    response && props.history.push("/mybooks");
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader ghost={false} title="Add book"></PageHeader>
      </div>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: "Please input photo!" }]}
        >
          <Input value="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Form.Item>

        {/* <Form.Item>
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Upload your book cover image</p>
          </Dragger>
        </Form.Item> */}

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="5ef073dcb00a922548270939">
              Category 1
            </Select.Option>
            <Select.Option value="5ef073dcb00a922548270939">
              Category 2
            </Select.Option>
            <Select.Option value="5ef073dcb00a922548270939">
              Category 3
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="pages"
          label="Number of pages"
          rules={[{ required: true, message: "Please input your book pages!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="reference"
          label="Reference"
          rules={[
            { required: true, message: "Please input your book reference!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isOnTrueEvent"
          label="Is on True Event"
          rules={[{ required: true, message: "Please select event!" }]}
        >
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="0">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Add;
