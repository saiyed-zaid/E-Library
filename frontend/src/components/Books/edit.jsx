import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateData, fetchCategories } from "../../redux/ActionApi";

import {
  PageHeader,
  Button,
  Form,
  Radio,
  Input,
  Select,
  Upload,
  message,
} from "antd";

import { InboxOutlined } from "@ant-design/icons";

const Edit = (props) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const categories = useSelector((state) => state.books.categories);

  const books = useSelector((state) => {
    return state.books.books;
  });
  const book = books.filter((book) => book._id === props.match.params.bookId);

  const [photo, setPhoto] = useState(book[0] ? book[0].photo : " ");
  const [reference, setReference] = useState(book[0] ? book[0].reference : " ");

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const { Dragger } = Upload;

  const photoProps = {
    name: "photo",
    multiple: true,
    action: `${process.env.REACT_APP_BACKEND_URI}/upload`,
    onChange(info) {
      const { status, response } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done" && response.isUploaded) {
        setPhoto(response.public_uri);

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const referenceProps = {
    name: "reference",
    multiple: true,
    action: `${process.env.REACT_APP_BACKEND_URI}/upload`,
    onChange(info) {
      const { status, response } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done" && response.isUploaded) {
        setPhoto(response.public_uri);

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = (data) => {
    data.photo = photo;
    data.reference = reference;

    const response = dispatch(
      updateData(data, props.match.params.bookId, authUser._id, authUser.token)
    );

    response && props.history.push("/mybooks");
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Edit book"
          onBack={() => window.history.back()}
        ></PageHeader>
      </div>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          initialValue={book[0] && book[0].title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          initialValue={book[0] && book[0].description}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="photo" label="Cover Photo">
          <Dragger {...photoProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Upload your book cover image</p>
          </Dragger>
        </Form.Item>

        {/* <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: "Please input photo!" }]}
          initialValue={book[0] && book[0].photo}
        >
          <Input value="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Form.Item> */}

        <Form.Item label="Category" name="category">
          <Select defaultValue={book[0] && book[0].category}>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => {
                return (
                  <Select.Option value={category._id}>
                    {category.name}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item
          name="pages"
          label="Number of pages"
          initialValue={book[0] && book[0].pages}
        >
          <Input />
        </Form.Item>

        {/*  <Form.Item
          name="reference"
          label="Reference"
          rules={[
            { required: true, message: "Please input your book reference!" },
          ]}
          initialValue={book[0] && book[0].reference}
        >
          <Input />
        </Form.Item> */}

        <Form.Item name="reference" label="Reference">
          <Dragger {...referenceProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Upload your book PDF</p>
          </Dragger>
        </Form.Item>
        <Form.Item name="isOnTrueEvent" label="Is on True Event">
          <Radio.Group
            defaultValue={book[0] && book[0].isOnTrueEvent ? "1" : "0"}
          >
            <Radio value="1">Yes</Radio>
            <Radio value="0">No</Radio>
          </Radio.Group>
        </Form.Item>
        {/* //book[0] && book[0].isOnTrueEvent */}
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
