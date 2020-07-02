import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

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
  ReadFilled,
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
  fetchAuthUser,
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
  const user = useSelector((state) => state.authUser.user);

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  var hasLiked = false,
    hasDisliked = false,
    hasFavourite = false,
    hasReadLater = false;

  useEffect(() => {
    dispatch(fetchBook(props.match.params.bookId));
    dispatch(fetchAuthUser(authUser._id, authUser.token));
  }, []);

  if (book.likes && book.likes.length > 0) {
    const index = book.likes.findIndex((value) => {
      return value._id === authUser._id;
    });
    index !== -1 && (hasLiked = true);
  }

  if (book.dislikes && book.dislikes.length > 0) {
    const index = book.dislikes.findIndex((value) => {
      return value._id === authUser._id;
    });
    index !== -1 && (hasDisliked = true);
  }

  if (user.favouriteBook && user.favouriteBook.length > 0) {
    const index = user.favouriteBook.findIndex((value) => {
      return value.book._id === book._id;
    });
    index !== -1 && (hasFavourite = true);
  }

  if (user.bookToReadLater && user.bookToReadLater.length > 0) {
    const index = user.bookToReadLater.findIndex((value) => {
      return value._id === book._id;
    });
    index !== -1 && (hasReadLater = true);
  }

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
      toggleFavourite(
        hasFavourite,
        { bookId: book._id },
        authUser._id,
        authUser.token
      )
    );
  };

  const handleReadlater = (event) => {
    dispatch(
      toggleReadlater(
        hasReadLater,
        { bookId: book._id },
        authUser._id,
        authUser.token
      )
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
            src={book.photo}
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
            }
            style={{ height: "200px", objectFit: "contain" }}
          />
        }
        actions={[
          <Statistic
            value={book.likes && book.likes.length}
            valueStyle={{ fontSize: "1rem" }}
            prefix={
              hasLiked ? (
                <LikeFilled
                  style={{ fontSize: "1rem" /* color: "#08c"  */ }}
                  onClick={handleLike}
                />
              ) : (
                <LikeOutlined
                  style={{ fontSize: "1rem" /* color: "#08c"  */ }}
                  onClick={handleLike}
                />
              )
            }
          />,
          <Statistic
            value={book.dislikes && book.dislikes.length}
            valueStyle={{ fontSize: "1rem" }}
            prefix={
              hasDisliked ? (
                <DislikeFilled
                  style={{ fontSize: "1rem" /* color: "#08c"  */ }}
                  onClick={handleDislike}
                />
              ) : (
                <DislikeOutlined
                  style={{ fontSize: "1rem" /* color: "#08c"  */ }}
                  onClick={handleDislike}
                />
              )
            }
          />,
          hasReadLater ? (
            <ReadFilled key="edit" onClick={handleReadlater} />
          ) : (
            <ReadOutlined key="edit" onClick={handleReadlater} />
          ),
          hasFavourite ? (
            <HeartFilled key="edit" onClick={handleFavourite} />
          ) : (
            <HeartOutlined key="edit" onClick={handleFavourite} />
          ),
        ]}
      >
        {book.description}
      </Card>
      {book.comments &&
        book.comments.map((comment) => {
          return (
            <Comment
              author={
                <Link>
                  {comment.postedBy.username === authUser.username && "you"}
                </Link>
              }
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
