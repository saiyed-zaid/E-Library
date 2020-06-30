import React, { useEffect, useState } from "react";

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
  Statistic,
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
  HeartFilled,
} from "@ant-design/icons";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchBook,
  addComment,
  toggleLike,
  toggleDislike,
  toggleFavourite,
  toggleReadlater,
} from "../../redux/ActionApi";

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

const Book = (props) => {
  const book = useSelector((state) => state.books.book);
  const authUser = useSelector((state) => state.authUser.authUser);

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [hasFavourite, setHasFavourite] = useState(false);

  useEffect(() => {
    dispatch(fetchBook(props.match.params.bookId));
  }, []);

  const onhandleComment = () => {
    const commentData = {
      bookId: book._id,
      comment: comment,
    };

    dispatch(addComment(commentData, authUser._id, authUser.token));

    setComment("");
  };

  const onHandleInputComment = (event) => {
    setComment(event.target.value);
  };

  const handleLike = (event) => {
    dispatch(toggleLike({ bookId: book._id }, authUser._id, authUser.token));
  };

  const handleDislike = (event) => {
    dispatch(toggleDislike({ bookId: book._id }, authUser._id, authUser.token));
  };

  const handleFavourite = (event) => {
    dispatch(
      toggleFavourite({ bookId: book._id }, authUser._id, authUser.token)
    );
  };

  const handleReadlater = (event) => {
    dispatch(
      toggleReadlater({ bookId: book._id }, authUser._id, authUser.token)
    );
  };

  return (
    <>
      <Card
        title={book.title}
        bordered={false}
        cover={
          <img
            alt="example"
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          />
        }
        actions={[
          <Statistic
            value={book.likes && book.likes.length}
            valueStyle={{ fontSize: "1rem" }}
            prefix={
              <LikeOutlined
                style={{ fontSize: "1rem" /* color: "#08c"  */ }}
                onClick={handleLike}
              />
            }
          />,
          <Statistic
            value={book.dislikes && book.dislikes.length}
            valueStyle={{ fontSize: "1rem" }}
            prefix={
              <DislikeOutlined
                style={{ fontSize: "1rem" }}
                onClick={handleDislike}
              />
            }
          />,
          <ReadOutlined key="edit" onClick={handleReadlater} />,
          <HeartFilled key="edit" onClick={handleFavourite} />,
        ]}
      >
        {book.description}
      </Card>

      {book.comments &&
        book.comments.map((comment) => {
          return (
            <Comment
              author={<a>Han Solo</a>}
              avatar={
                <Avatar
                  src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  alt="Han Solo"
                />
              }
              content={<p>{comment.text}</p>}
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment(comment.created).fromNow()}</span>
                </Tooltip>
              }
            />
          );
        })}

      <Comment
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            submitting=""
            value={comment}
            onSubmit={onhandleComment}
            onChange={onHandleInputComment}
          />
        }
      />
    </>
  );
};

export default Book;
