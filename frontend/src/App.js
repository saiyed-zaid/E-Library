import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";

import Signup from "./components/Singup";
import Signin from "./components/Singin";
import ForgetPassword from "./components/forget-password";
import ResetPassword from "./components/Reset-Password";
import Dashboard from "./components/Dashboard";
import MyBooks from "./components/Books";
import AddBook from "./components/Books/add";

function App() {
  const { Header } = Layout;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

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
              <Menu.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/add-book">Add Book</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/mybooks">My Books</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/signup">Signup</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/signin">Login</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Dropdown overlay={menu}>
                  <Avatar
                    style={{ verticalAlign: "middle" }}
                    size="small"
                    gap={1}
                  >
                    ZSS
                  </Avatar>
                </Dropdown>
              </Menu.Item>
            </Menu>
          </Header>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/mybooks" component={MyBooks} />
            <Route exact path="/add-book" component={AddBook} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
