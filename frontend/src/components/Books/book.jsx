import React from "react";

import {
  List,
  Avatar,
  Space,
  Comment,
  Tooltip,
  Card,
  Popconfirm,
  Form,
  Button,
  Input,
} from "antd";
import {
  LikeOutlined,
  StarOutlined,
  MessageOutlined,
  LikeFilled,
  DislikeFilled,
  DislikeOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const action = "liked";

const Book = () => {
  return (
    <>
      <Card
        title="Demo"
        bordered={false}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          />
        }
        actions={[
          <LikeOutlined key="edit" />,
          <DislikeOutlined key="edit" />,
          <ReadOutlined key="edit" />,
          <HeartOutlined key="edit" />,
        ]}
      >
        "This is description"
      </Card>

      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />

      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />

      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />

      <Comment
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Han Solo"
          />
        }
        content={<Editor submitting="" value="" />}
      />
    </>
  );
};

export default Book;
