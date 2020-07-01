import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { insertData, fetchCategories } from "../../redux/ActionApi";

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

const Add = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const authUser = useSelector((state) => state.authUser.authUser);

  const categories = useSelector((state) => state.books.categories);

  const [reference, setReference] = useState("");
  const [photo, setPhoto] = useState("");

  const { Dragger } = Upload;

  const referenceProps = {
    name: "reference",
    multiple: true,
    action: `${process.env.REACT_APP_BACKEND_URI}/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setReference(`http://localhost:5431/upload/${info.file.name}`);

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const photoProp = {
    name: "photo",
    multiple: true,
    action: `${process.env.REACT_APP_BACKEND_URI}/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setPhoto(`http://localhost:5431/upload/${info.file.name}`);

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = async (data) => {
    data.reference = reference;
    data.photo = photo;

    const response = await dispatch(
      insertData(data, authUser.token, authUser._id)
    );

    setTimeout(() => {
      response && props.history.push("/mybooks");
    }, 300);
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Add book"
          onBack={() => window.history.back()}
        ></PageHeader>
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

        {/* <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: "Please input photo!" }]}
        >
          <Input value="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Form.Item> */}

        <Form.Item
          name="photo"
          label="Cover Photo"
          rules={[{ required: true, message: "Please input your book photo!" }]}
        >
          <Dragger {...photoProp}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Upload your book cover image</p>
          </Dragger>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
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

        {/* <Form.Item
          name="reference"
          label="Reference"
          rules={[
            { required: true, message: "Please input your book reference!" },
          ]}
        >
          <Input />
        </Form.Item> */}

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

export default withRouter(Add);
