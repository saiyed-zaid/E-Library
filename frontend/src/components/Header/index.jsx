import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Layout, Menu, Avatar, Dropdown } from "antd";

import {
  PoweroffOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Logout } from "../../redux/actions/userActions";

const { Header } = Layout;

const Navbar = (props) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);

  const logout = () => {
    dispatch(Logout());

    props.history.push("/signin");
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Manage Profile
        </a>
      </Menu.Item>
      <Menu.Item icon={<LockOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Change Password
        </a>
      </Menu.Item>

      <Menu.Item icon={<PoweroffOutlined />} danger onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ position: "sticky", top: "0", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" style={{ textAlign: "right" }}>
        {props.isLoggedIn && (
          <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && authUser.role === "writer" && (
          <Menu.Item key="2">
            <Link to="/add-book">Add Book</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && authUser.role === "writer" && (
          <Menu.Item key="3">
            <Link to="/mybooks">My Books</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && authUser.role === "reader" && (
          <Menu.Item key="4">
            <Link to="/search">Search</Link>
          </Menu.Item>
        )}

        {!props.isLoggedIn && (
          <Menu.Item key="6">
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        )}

        {!props.isLoggedIn && (
          <Menu.Item key="7">
            <Link to="/signin">Login</Link>
          </Menu.Item>
        )}

        {props.isLoggedIn && (
          <Menu.Item key="5">
            <Dropdown overlay={menu}>
              <Avatar
                style={{ backgroundColor: "#7265e6" }}
                size="large"
              >
                {authUser &&
                  authUser.username.charAt(0).toUpperCase() +
                    authUser.username.slice(1)}
              </Avatar>
            </Dropdown>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default withRouter(Navbar);
