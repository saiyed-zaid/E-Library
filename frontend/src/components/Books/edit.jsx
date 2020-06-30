import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateData } from "../../redux/ActionApi";

import { PageHeader, Button, Form, Radio, Input, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const Edit = (props) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const books = useSelector((state) => {
    return state.books.books;
  });

  const book = books.filter((book) => book._id === props.match.params.bookId);

  const { Dragger } = Upload;

  const handleSubmit = (data) => {
    const response = dispatch(
      updateData(data, props.match.params.bookId, authUser._id, authUser.token)
    );

    response && props.history.push("/mybooks");
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader ghost={false} title="Edit book"></PageHeader>
      </div>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
          initialValue={book[0] && book[0].title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
          initialValue={book[0] && book[0].description}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: "Please input photo!" }]}
          initialValue={book[0] && book[0].photo}
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
          initialValue={book[0] && book[0].pages}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="reference"
          label="Reference"
          rules={[
            { required: true, message: "Please input your book reference!" },
          ]}
          initialValue={book[0] && book[0].reference}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isOnTrueEvent"
          label="Is on True Event"
          rules={[{ required: true, message: "Please select event!" }]}
        >
          <Radio.Group>
            <Radio value="1" checked={book[0] && book[0].isOnTrueEvent}>
              Yes
            </Radio>
            <Radio value="0" checked={book[0] && book[0].isOnTrueEvent}>
              No
            </Radio>
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

export default Edit;
