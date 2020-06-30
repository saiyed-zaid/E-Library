import React, { useEffect } from "react";
import { Row, Col, Card, PageHeader, Button, Popconfirm, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { connect, useDispatch, useSelector } from "react-redux";

import { fetchAuthorBooks, deleteData } from "../../redux/ActionApi";

const { Meta } = Card;

const MyBooks = (props) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchAuthorBooks(authUser));
  }, []);

  const handleDelete = (_id) => {
    const response = dispatch(deleteData(_id, authUser._id, authUser.token));
  };

  const handleEdit = (_id) => {
    props.history.push(`/edit-book/${_id}`);
  };

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
        {/*  {props.books.loading && (
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
        )} */}
        {books &&
          books.map((book) => {
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
                    <EditOutlined
                      key="edit"
                      onClick={() => handleEdit(book._id)}
                    />,
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleDelete(book._id)}
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

/* const mapStateToProps = (state) => {
  return {
    books: state.books,
    authUser: state.authUser.authUser.user,
  };
};

const mapDispatchToPropss = (dispatch) => {
  return {
    fetchBooks: (token, id) => dispatch(fetchAuthorBooks({ token, id })),
  };
};

export default connect(mapStateToProps, mapDispatchToPropss)(MyBooks);
*/

export default MyBooks;
