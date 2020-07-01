import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Layout,
  Popconfirm,
  Empty,
  Button,
  message,
} from "antd";
import {
  LikeTwoTone,
  DislikeTwoTone,
  BookTwoTone,
  LikeOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import {
  fetchAuthUser,
  insertCurrentRead,
  deleteCurrentRead,
} from "../../redux/ActionApi";

import { SETBOOKTOREAD } from "../../redux/actions/BookActions";

import { useSelector, useDispatch } from "react-redux";

const Dashboard = (props) => {
  const { Content } = Layout;

  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  /* !isLoggedIn && props.history.push("/signin"); */
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const user = useSelector((state) => state.authUser.user);

  useEffect(() => {
    dispatch(fetchAuthUser(authUser._id, authUser.token));
  }, [authUser]);

  if (user) {
    if (!user.plan && user._id) {
      props.history.push("/plans");
    }
  }

  const favouriteBooks = useSelector(
    (state) => state.authUser.user.favouriteBook
  );

  const ReadlaterBooks = useSelector(
    (state) => state.authUser.user.bookToReadLater
  );

  const currentReading = useSelector(
    (state) => state.authUser.user.currentReading
  );

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const handleBookView = (_id) => {
    props.history.push(`/book/${_id}`);
  };

  const handleBookRead = async (_id, url) => {
    //dispatch(SETBOOKTOREAD({ _id, url }));

    const response = await dispatch(
      insertCurrentRead({ bookId: _id, url }, authUser._id, authUser.token)
    );

    if (response) {
      response && dispatch(SETBOOKTOREAD({ _id, url }));

      setTimeout(() => props.history.push("/book/view"), 300);
    }
  };

  const handleContnueBookRemove = (_id) => {
    dispatch(deleteCurrentRead(_id, authUser._id, authUser.token));
  };

  return (
    <>
      <div className="site-card-wrapper">
        <h1>Contiue Reading...</h1>
        {currentReading && currentReading.length <= 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 100,
            }}
            description={<span>Search book here...</span>}
          >
            <Button type="dashed" onClick={() => props.history.push("/search")}>
              Find Books
            </Button>
          </Empty>
        )}
        <Row gutter={[16, 16]}>
          {currentReading &&
            currentReading.length > 0 &&
            currentReading.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
                    bordered={true}
                    title={book.title}
                    cover={
                      <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      />
                    }
                  >
                    <Row gutter={24}>
                      <Col span={18}>
                        <p>{book.description}</p>
                      </Col>
                      <Col span={4}>
                        <InfoCircleOutlined style={{ cursor: "pointer" }} />
                      </Col>
                      <Col span={2}>
                        <Popconfirm
                          title="Do you want to remove from this list?"
                          onConfirm={() => handleContnueBookRemove(book._id)}
                          onCancel={() => 1}
                          okText="Yes"
                          cancelText="No"
                        >
                          <CloseCircleOutlined style={{ cursor: "pointer" }} />
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper">
        <h1>Favourite Books</h1>
        {favouriteBooks && favouriteBooks.length <= 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 100,
            }}
            description={<span>Search book here...</span>}
          >
            <Button type="dashed" onClick={() => props.history.push("/search")}>
              Find Books
            </Button>
          </Empty>
        )}
        <Row gutter={[16, 16]}>
          {favouriteBooks &&
            favouriteBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
                    bordered={true}
                    title={
                      book.title.charAt(0).toUpperCase() + book.title.slice(1)
                    }
                    cover={
                      <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      />
                    }
                  >
                    <Row gutter={24}>
                      <Col span={20}>
                        <p>
                          {book.description.charAt(0).toUpperCase() +
                            book.description.slice(1)}
                        </p>
                      </Col>
                      <Col span={4}>
                        <InfoCircleOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => handleBookView(book._id)}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper">
        <h1>Later Read Book List</h1>
        {ReadlaterBooks && ReadlaterBooks.length <= 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 100,
            }}
            description={<span>Search book here...</span>}
          >
            <Button type="dashed" onClick={() => props.history.push("/search")}>
              Find Books
            </Button>
          </Empty>
        )}
        <Row gutter={[16, 16]}>
          {ReadlaterBooks &&
            ReadlaterBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
                    bordered={true}
                    title={
                      book.title.charAt(0).toUpperCase() + book.title.slice(1)
                    }
                    cover={
                      <Popconfirm
                        title="Do you want to read?"
                        onConfirm={() =>
                          handleBookRead(book._id, book.reference)
                        }
                        onCancel={() => 1}
                        okText="Yes"
                        cancelText="No"
                      >
                        <img
                          alt="example"
                          src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                      </Popconfirm>
                    }
                  >
                    <Row gutter={24}>
                      <Col span={20}>
                        <p>
                          {book.description.charAt(0).toUpperCase() +
                            book.description.slice(1)}
                        </p>
                      </Col>
                      <Col span={4}>
                        <InfoCircleOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => handleBookView(book._id)}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default withRouter(Dashboard);
