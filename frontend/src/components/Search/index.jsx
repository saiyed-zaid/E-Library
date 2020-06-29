import React, { useEffect, useState } from "react";

import {
  PageHeader,
  Input,
  Select,
  Card,
  Popconfirm,
  Col,
  Row,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchBooks,
  fetchCategories,
  fetchAuthors,
  fetchAuthorBooks,
} from "../../redux/ActionApi";

const { Search } = Input;
const { Option } = Select;

const SearchBooks = (props) => {
  const dispatch = useDispatch();

  const [searchFilter, setSearchFilter] = useState("title");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredAuthor, setFilteredAuthor] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const books = useSelector((state) => state.books.searchBooks);
  const categories = useSelector((state) => state.books.categories);
  const authors = useSelector((state) => state.books.authors);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
    dispatch(fetchAuthors());
  }, []);

  const handleSearchChange = (event) => {
    if (searchFilter === "title") {
      const filtered = books.filter((book) => {
        return book.title.startsWith(event.target.value);
      });

      setSearchResult(filtered);
    }

    if (searchFilter === "category") {
      const filtered = books.filter((book) => {
        return (
          book.title.startsWith(event.target.value) &&
          book.category._id === filteredCategory
        );
      });

      setSearchResult(filtered);
    }

    if (searchFilter === "author") {
      const filtered = books.filter((book) => {
        return (
          book.title.startsWith(event.target.value) &&
          book.author === filteredAuthor
        );
      });

      setSearchResult(filtered);
    }
  };

  const handleSearchFilter = (e) => {
    setSearchFilter(e);
  };

  const handleCategoryFilter = (e) => {
    setFilteredCategory(e);
  };

  const handleAuthorFilter = (e) => {
    setFilteredAuthor(e);
  };

  const handleBookView = (_id) => {
    props.history.push(`/book/${_id}`);
  };

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader ghost={false}>
          <Form name="basic">
            <Form.Item>
              <Input.Group compact>
                <Select defaultValue="title" onChange={handleSearchFilter}>
                  <Option value="category">Category</Option>
                  <Option value="author">Author</Option>
                  <Option value="title">Title</Option>
                </Select>
                <Search
                  placeholder="Search books"
                  onSearch={(value) => console.log("SEARCH BUTTON CLICKED")}
                  onChange={(value) => handleSearchChange(value)}
                  style={{ width: 200 }}
                />
              </Input.Group>
            </Form.Item>

            {searchFilter !== "title" && (
              <Form.Item>
                <Input.Group compact>
                  <Select
                    showSearch
                    style={{ width: 270 }}
                    placeholder={
                      (searchFilter === "author" && "Search a author") ||
                      (searchFilter === "category" && "Search a category")
                    }
                    optionFilterProp="children"
                    onChange={
                      (searchFilter === "category" && handleCategoryFilter) ||
                      (searchFilter === "author" && handleAuthorFilter)
                    }
                    onSearch={() => 1}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {searchFilter === "category" &&
                      categories.map((category) => {
                        return (
                          <Option value={category._id}>{category.name}</Option>
                        );
                      })}

                    {searchFilter === "author" &&
                      authors.map((author) => {
                        return (
                          <Option value={author._id}>{author.firstname}</Option>
                        );
                      })}
                  </Select>
                </Input.Group>
              </Form.Item>
            )}
          </Form>
        </PageHeader>
      </div>

      <Row gutter={[16, 16]}>
        {searchResult.map((book) => {
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
              >
                <Row gutter={24}>
                  <Col span={19}>
                    <p>{book.description}</p>
                  </Col>
                  <Col span={5}>
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
    </>
  );
};

export default SearchBooks;
