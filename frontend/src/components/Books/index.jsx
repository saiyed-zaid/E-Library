import React, { useEffect, useState } from "react";

import { Document, Page } from "react-pdf";

import { Row, Col, Card, PageHeader, Button, Popconfirm, Avatar } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { connect, useDispatch, useSelector } from "react-redux";

import {
  fetchAuthorBooks,
  deleteData,
  updateData,
} from "../../redux/ActionApi";

import { Redirect } from "react-router-dom";

const { Meta } = Card;

const MyBooks = (props) => {
  const dispatch = useDispatch();

  const [isViewed, setIsViewed] = useState(false);

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

  const handlePrivacy = (_id, status) => {
    dispatch(
      updateData({ status: !status }, _id, authUser._id, authUser.token)
    );
  };

  const handleBookView = (url) => {
    //props.history.push(`/book/view`);
    setIsViewed(true);
  };

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="My Books"
          onBack={() => window.history.back()}
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
      {isViewed ? (
        <ViewBook />
      ) : (
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
                    title={
                      book.title.charAt(0).toUpperCase() + book.title.slice(1)
                    }
                    bordered={false}
                    cover={
                      <Popconfirm
                        title="Do you want to read？"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleBookView(book.reference)}
                      >
                        <img
                          alt="example"
                          src="https://images.unsplash.com/photo-1592859372969-7ce244fb6582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                      </Popconfirm>
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
                        <DeleteOutlined key="delete" />
                      </Popconfirm>,
                      <Popconfirm
                        title={
                          book.status
                            ? "Are you sure to private this book?"
                            : "Are you sure to public this book"
                        }
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handlePrivacy(book._id, book.status)}
                      >
                        {book.status ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </Popconfirm>,
                    ]}
                  >
                    {book.description.charAt(0).toUpperCase() +
                      book.description.slice(1)}
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

const ViewBook = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="http://localhost:5431/upload/Arpil-Report (Saiyad zaid 92).pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
export default MyBooks;
