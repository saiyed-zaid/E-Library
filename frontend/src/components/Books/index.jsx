import React, { useEffect } from "react";
import { Row, Col, Card, PageHeader, Button, Popconfirm, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { connect } from "react-redux";

import { fetchAuthorBooks } from "../../redux/ActionApi";

const { Meta } = Card;
const MyBooks = (props) => {
  useEffect(() => {
    props.fetchBooks(props.authUser);
  }, []);
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="My Books"
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => props.history.push("/add-book")}
            >
              Add Book
            </Button>,
          ]}
        ></PageHeader>
      </div>
      
      <Row gutter={[16, 16]}>
        {props.books.loading && (
          <Col xs={24} md={4}>
            <Card loading>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
        )}
        {props.books.books.map((book) => {
          return (
            <Col xs={24} md={4}>
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
                  <EditOutlined key="edit" />,
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>
                  </Popconfirm>,
                ]}
              >
                {book.description}
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
    authUser: state.authUser.authUser.user,
  };
};

const mapDispatchToPropss = (dispatch) => {
  return {
    fetchBooks: (token, id) => dispatch(fetchAuthorBooks(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToPropss)(MyBooks);
