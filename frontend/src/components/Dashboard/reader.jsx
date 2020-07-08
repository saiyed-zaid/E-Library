import React, { useEffect, Fragment } from "react";

import { withRouter } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Layout,
  Popconfirm,
  Empty,
  Button,
  Typography,
  Skeleton,
} from "antd";
import { CloseCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

import {
  fetchAuthUser,
  insertCurrentRead,
  deleteCurrentRead,
} from "../../redux/ActionApi";

import { SETBOOKTOREAD } from "../../redux/actions/BookActions";

import { useSelector, useDispatch } from "react-redux";

const { Title, Paragraph } = Typography;

const Dashboard = (props) => {
  const { Content } = Layout;

  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  /* !isLoggedIn && props.history.push("/signin"); */
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const user = useSelector((state) => state.authUser.user);

  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(fetchAuthUser(authUser._id, authUser.token));
  }, [authUser]);

  if (user) {
    if (!user.plan && user._id) {
      props.history.push("/plans");
    }
  }

  const bookSuggetions = useSelector((state) => state.authUser.user.interest);

  const favouriteBooks = useSelector(
    (state) => state.authUser.user.favouriteBook
  );

  var ReadlaterBooks = useSelector(
    (state) => state.authUser.user.bookToReadLater
  );

  if (ReadlaterBooks && ReadlaterBooks.length > 3) {
    const shuffled = ReadlaterBooks.sort(() => 0.5 - Math.random());
    ReadlaterBooks = shuffled.slice(0, 3);
  }

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

  const handleContinueBookRemove = (_id) => {
    dispatch(deleteCurrentRead(_id, authUser._id, authUser.token));
  };

  return (
    <Fragment>
      <div className="site-card-wrapper custom-card-wrapper">
        <h1>RECOMMENDED FOR YOU</h1>
        {globalState.loading && <Skeleton active />}

        {bookSuggetions && bookSuggetions.length <= 0 && (
          <Empty
            style={{
              margin: "auto",
            }}
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
          {!globalState.loading &&
            bookSuggetions &&
            bookSuggetions.length > 0 &&
            bookSuggetions.map((book, index) => {
              return (
                index <= 2 && (
                  <Col xs={24} md={8} key={index}>
                    <Card
                      hoverable="true"
                      title={
                        <Button
                          type="link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBookRead(book._id, book.reference);
                          }}
                        >
                          {book.title.charAt(0).toUpperCase() +
                            book.title.slice(1)}
                        </Button>
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
                            src={book.photo}
                            onError={(e) =>
                              (e.target.src =
                                "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                            }
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                        </Popconfirm>
                      }
                    >
                      <Row gutter={24}>
                        <Col span={18}>
                          <Paragraph>
                            {book.description.charAt(0).toUpperCase() +
                              book.description.slice(1)}
                          </Paragraph>
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
                )
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper custom-card-wrapper">
        <h1>CONTINUE READING</h1>
        {globalState.loading && <Skeleton active />}

        {currentReading && currentReading.length <= 0 && (
          <Empty
            style={{ margin: "auto" }}
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
          {!globalState.loading &&
            currentReading &&
            currentReading.length > 0 &&
            currentReading.map((book, index) => {
              return (
                index <= 2 && (
                  <Col xs={24} md={8} key={index}>
                    <Card
                      hoverable="true"
                      bordered={true}
                      title={
                        <Button
                          type="link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBookRead(book.book._id, book.book.reference);
                          }}
                        >
                          {book.book.title.charAt(0).toUpperCase() +
                            book.book.title.slice(1)}
                        </Button>
                      }
                      cover={
                        <Popconfirm
                          title="Do you want to read?"
                          onConfirm={() =>
                            handleBookRead(book.book._id, book.book.reference)
                          }
                          onCancel={() => 1}
                          okText="Yes"
                          cancelText="No"
                        >
                          <img
                            alt="example"
                            src={book.book.photo}
                            onError={(e) =>
                              (e.target.src =
                                "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                            }
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                        </Popconfirm>
                      }
                    >
                      <Row gutter={23}>
                        <Col span={17}>
                          <p>
                            {book.book.description.charAt(0).toUpperCase() +
                              book.book.description.slice(1)}
                          </p>
                        </Col>
                        <Col span={4}>
                          <InfoCircleOutlined
                            style={{ cursor: "pointer" }}
                            onClick={() => handleBookView(book.book._id)}
                          />
                        </Col>
                        <Col span={2}>
                          <Popconfirm
                            title="Do you want to remove from this list?"
                            onConfirm={() =>
                              handleContinueBookRemove(book.book._id)
                            }
                            onCancel={() => 1}
                            okText="Yes"
                            cancelText="No"
                          >
                            <CloseCircleOutlined
                              style={{ cursor: "pointer" }}
                            />
                          </Popconfirm>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                )
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper custom-card-wrapper">
        <h1>FAVORITE BOOKS</h1>
        {globalState.loading && <Skeleton active />}

        {favouriteBooks && favouriteBooks.length <= 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 100,
            }}
            style={{
              margin: "auto",
            }}
            description={<span>Search book here...</span>}
          >
            <Button type="dashed" onClick={() => props.history.push("/search")}>
              Find Books
            </Button>
          </Empty>
        )}
        <Row gutter={[16, 16]} style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
          {!globalState.loading &&
            favouriteBooks &&
            favouriteBooks.map((book, index) => {
              return (
                index <= 2 && (
                  <Col xs={24} md={8} key={index}>
                    <Card
                      hoverable="true"
                      bordered={true}
                      title={
                        <Button
                          type="link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBookRead(book.book._id, book.book.reference);
                          }}
                        >
                          {book.book.title.charAt(0).toUpperCase() +
                            book.book.title.slice(1)}
                        </Button>
                      }
                      cover={
                        <Popconfirm
                          title="Do you want to read?"
                          onConfirm={() =>
                            handleBookRead(book.book._id, book.book.reference)
                          }
                          onCancel={() => 1}
                          okText="Yes"
                          cancelText="No"
                        >
                          <img
                            alt="example"
                            src={book.book.photo}
                            onError={(e) =>
                              (e.target.src =
                                "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                            }
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                        </Popconfirm>
                        /*  <img
                          alt="example"
                          src={book.book.photo}
                          onError={(e) =>
                            (e.target.src =
                              "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                          }
                          style={{ height: "200px", objectFit: "contain" }}
                        /> */
                      }
                    >
                      <Row gutter={24}>
                        <Col span={20}>
                          <p>
                            {book.book.description.charAt(0).toUpperCase() +
                              book.book.description.slice(1)}
                          </p>
                        </Col>
                        <Col span={4}>
                          <InfoCircleOutlined
                            style={{ cursor: "pointer" }}
                            onClick={() => handleBookView(book.book._id)}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                )
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper custom-card-wrapper">
        <h1>FROM READ LATER BOOK LIST</h1>
        {globalState.loading && <Skeleton active />}

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
          {!globalState.loading &&
            ReadlaterBooks &&
            ReadlaterBooks.length >= 0 &&
            ReadlaterBooks.map((book, index) => {
              return (
                <Col xs={24} md={8} key={index}>
                  <Card
                    hoverable="true"
                    bordered={true}
                    title={
                      <Button
                        type="link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookRead(book._id, book.reference);
                        }}
                      >
                        {book.title.charAt(0).toUpperCase() +
                          book.title.slice(1)}
                      </Button>
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
                          src={book.photo}
                          onError={(e) =>
                            (e.target.src =
                              "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                          }
                          style={{ height: "200px", objectFit: "contain" }}
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
    </Fragment>
  );
};

export default withRouter(Dashboard);
