import React, { useEffect } from "react";
import { Row, Col, Card, Layout, Statistic } from "antd";
import {
  LikeTwoTone,
  DislikeTwoTone,
  BookTwoTone,
  LikeOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FetchMostLikedBooks, FetchMostReadBooks } from "../../redux/ActionApi";

const Dashboard = (props) => {
  const { Content } = Layout;

  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  !isLoggedIn && props.history.push("/signin");

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.authUser);

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
      <div className="site-card-wrapper">
        <h1>Top 3 Liked Books</h1>
        <Row gutter={[16, 16]}>
          {mostLikedBooks &&
            mostLikedBooks.length > 0 &&
            mostLikedBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
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
      <div className="site-card-wrapper">
        <h1>Top 3 Reading Books</h1>
        <Row gutter={[16, 16]}>
          {mostReadBooks &&
            mostReadBooks.length > 0 &&
            mostReadBooks.map((book) => {
              return (
                <Col xs={24} md={8}>
                  <Card
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
                    <p>Cosos Theory</p>
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
                          value={book._id.likes.length}
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
    </>
  );
};
export default withRouter(Dashboard);
