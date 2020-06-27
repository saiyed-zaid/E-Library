import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Layout, Menu, Avatar, Dropdown } from "antd";

import { GET, Logout } from "../../redux/actions/userActions";

const { Header, Content } = Layout;

const Navbar = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(Logout());
    console.log("APP ROUTER PROPS", props);

    props.history.push("/signin");
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

      <Menu.Item danger onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ position: "sticky", top: "0", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ textAlign: "right" }}
      >
        {props.isLoggedIn && (
          <Menu.Item>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && (
          <Menu.Item>
            <Link to="/add-book">Add Book</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && (
          <Menu.Item>
            <Link to="/mybooks">My Books</Link>
          </Menu.Item>
        )}

        <Menu.Item>
          <Link to="/search">Search</Link>
        </Menu.Item>

        {props.isLoggedIn && (
          <Menu.Item key="3">
            <Dropdown overlay={menu}>
              <Avatar style={{ verticalAlign: "middle" }} size="small" gap={1}>
                {props.authUser &&
                  props.authUser.user &&
                  props.authUser.user.email}
              </Avatar>
            </Dropdown>
          </Menu.Item>
        )}

        {!props.isLoggedIn && (
          <Menu.Item key="1">
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        )}

        {!props.isLoggedIn && (
          <Menu.Item key="2">
            <Link to="/signin">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default withRouter(Navbar);
