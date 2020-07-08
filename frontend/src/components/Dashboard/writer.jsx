import React, { useEffect } from "react";
import { Row, Col, Card, Layout, Statistic, Skeleton, Empty } from "antd";
import { LikeTwoTone, DislikeTwoTone, BookTwoTone } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FetchMostLikedBooks, FetchMostReadBooks } from "../../redux/ActionApi";

const Dashboard = (props) => {
  const { Content } = Layout;

  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  !isLoggedIn && props.history.push("/signin");

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.authUser);

  const globalState = useSelector((state) => state.global);

  const mostLikedBooks = useSelector(
    (state) => state.authUser.user.mostLikedBooks
  );

  const mostReadBooks = useSelector(
    (state) => state.authUser.user.mostReadBooks
  );

  console.log("favourite books", mostReadBooks);

  useEffect(() => {
    dispatch(FetchMostLikedBooks(authUser._id, authUser.token));
    dispatch(FetchMostReadBooks(authUser._id, authUser.token));
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <>
      <div className="site-card-wrapper custom-card-wrapper">
        <h1>Top 3 Liked Books</h1>
        <Row gutter={[16, 16]}>
          {globalState.loading && <Skeleton active />}

          {mostLikedBooks && mostLikedBooks.length <= 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 100,
              }}
              description={
                <span>Currently your books are haven't read by anyone...</span>
              }
            ></Empty>
          )}

          {!globalState.loading &&
            mostLikedBooks &&
            mostLikedBooks.length > 0 &&
            mostLikedBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
                    hoverable={true}
                    title={book._id.title}
                    bordered={true}
                    cover={
                      <img
                        alt="example"
                        src={book._id.photo}
                        onError={(e) =>
                          (e.target.src =
                            "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                        }
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                    }
                  >
                    <p>{book._id.description}</p>
                    <Row gutter={24}>
                      <Col span={8}>
                        <Statistic
                          title="Read"
                          value={book._id.numberOfRead.length}
                          prefix={<BookTwoTone />}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Like"
                          value={book.count}
                          prefix={<LikeTwoTone />}
                        />
                      </Col>

                      <Col span={8}>
                        <Statistic
                          title="Dislike"
                          value={book._id.dislikes.length}
                          prefix={<DislikeTwoTone />}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>

      <div className="site-card-wrapper custom-card-wrapper">
        <h1>Top 3 Reading Books</h1>
        <Row gutter={[16, 16]}>
          {globalState.loading && <Skeleton active />}

          {mostReadBooks && mostReadBooks.length <= 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 100,
              }}
              description={
                <span>Currently your books are haven't read by anyone...</span>
              }
            ></Empty>
          )}

          {!globalState.loading &&
            mostReadBooks &&
            mostReadBooks.length > 0 &&
            mostReadBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
                    hoverable={true}
                    title={book._id.title}
                    bordered={true}
                    cover={
                      <img
                        alt="example"
                        src={book._id.photo}
                        onError={(e) =>
                          (e.target.src =
                            "https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
                        }
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                    }
                  >
                    <p>{book._id.description}</p>
                    <Row gutter={24}>
                      <Col span={8}>
                        <Statistic
                          title="Read"
                          value={book.count}
                          prefix={<BookTwoTone />}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Like"
                          value={book._id.likes && book._id.likes.length}
                          prefix={<LikeTwoTone />}
                        />
                      </Col>

                      <Col span={8}>
                        <Statistic
                          title="Dislike"
                          value={book._id.dislikes && book._id.dislikes.length}
                          prefix={<DislikeTwoTone />}
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
