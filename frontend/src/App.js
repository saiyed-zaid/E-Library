import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";

import Signup from "./components/Singup";
import Signin from "./components/Singin";
import ForgetPassword from "./components/forget-password";
import ResetPassword from "./components/Reset-Password";
import Writer from "./components/Dashboard/writer";
import Reader from "./components/Dashboard/reader";
import MyBooks from "./components/Books";
import Book from "./components/Books/book";
import AddBook from "./components/Books/add";
import EditBook from "./components/Books/edit";
import Search from "./components/Search";
import ErrorPage from "./components/ErrorPages/404";

import store from "./redux/store";
import { Provider, connect } from "react-redux";

import { GET } from "./redux/actions/userActions";

function AppRouter(props) {
  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  useEffect(() => {
    props.getAuthUser();
  }, []);

  const { Header, Content } = Layout;

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Manage Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Change Password
        </a>
      </Menu.Item>

      <Menu.Item danger>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout>
        <Router>
          <Header
            style={{ position: "sticky", top: "0", zIndex: 1, width: "100%" }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ textAlign: "right" }}
            >
              {isLoggedIn && (
                <Menu.Item>
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
              )}

              {isLoggedIn && (
                <Menu.Item>
                  <Link to="/add-book">Add Book</Link>
                </Menu.Item>
              )}

              {isLoggedIn && (
                <Menu.Item>
                  <Link to="/mybooks">My Books</Link>
                </Menu.Item>
              )}

              <Menu.Item>
                <Link to="/search">Search</Link>
              </Menu.Item>

              {isLoggedIn && (
                <Menu.Item key="3">
                  <Dropdown overlay={menu}>
                    <Avatar
                      style={{ verticalAlign: "middle" }}
                      size="small"
                      gap={1}
                    >
                      {props.authUser.authUser.user &&
                        props.authUser.authUser.user.email}
                    </Avatar>
                  </Dropdown>
                </Menu.Item>
              )}

              {!isLoggedIn && (
                <Menu.Item key="1">
                  <Link to="/signup">Signup</Link>
                </Menu.Item>
              )}

              {!isLoggedIn && (
                <Menu.Item key="2">
                  <Link to="/signin">Login</Link>
                </Menu.Item>
              )}
            </Menu>
          </Header>
          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 10 }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 10, minHeight: 380 }}
            >
              <Switch>
                <Route exact path="/signup" component={Signup} />

                <Route exact path="/signin" component={Signin} />

                <Route
                  exact
                  path="/forget-password"
                  component={ForgetPassword}
                />

                <Route exact path="/reset-password" component={ResetPassword} />

                <Route
                  exact
                  path="/dashboard"
                  render={() => {
                    //alert(props.authUser.authUser.user.role);
                    if (props.authUser.authUser.user.role === "writer") {
                      return <Writer />;
                    } else if (props.authUser.authUser.user.role === "reader") {
                      return <Reader />;
                    } else {
                      return <Signin />;
                    }
                  }}
                />

                <Route exact path="/mybooks" component={MyBooks} />

                <Route exact path="/add-book" component={AddBook} />

                <Route exact path="/edit-book/:bookId" component={EditBook} />

                <Route exact path="/book/:bookId" component={Book} />

                <Route exact path="/search" component={Search} />

                <Route path="*" component={ErrorPage} />
              </Switch>
            </div>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: () => dispatch(GET()),
  };
};

const MainComponent = connect(mapStateToProps, mapDispatchToProps)(AppRouter);

const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
