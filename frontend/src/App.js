import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";

import Navbar from "./components/Header";
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
import PrivateRoute from "./components/Helper/PrivateRoute";

import store from "./redux/store";
import { Provider, connect, useDispatch, useSelector } from "react-redux";

import { GET, Logout } from "./redux/actions/userActions";

const { Header, Content } = Layout;

const AppRouter = (props) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser.authUser);
  
  const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;
  /* 
  useEffect(() => {
    props.getAuthUser();
  }, []); */

  return (
    <div>
      <Layout>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} />
          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 10 }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 10, minHeight: 380 }}
            >
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    if (authUser && authUser.role === "writer") {
                      return <Writer />;
                    } else if (
                      authUser &&
                      authUser.role === "reader"
                    ) {
                      return <Reader />;
                    } else {
                      alert("Oops signin render");
                      return <Signin />;
                    }
                  }}
                />
                <Route exact path="/signup" component={Signup} />

                <Route exact path="/signin" component={Signin} />

                <Route
                  exact
                  path="/forget-password"
                  component={ForgetPassword}
                />

                <Route exact path="/reset-password" component={ResetPassword} />

                {/* <Route exact path="/mybooks" component={MyBooks} /> */}

                <PrivateRoute
                  exact
                  path="/mybooks"
                  component={MyBooks}
                  {...props}
                />

                <PrivateRoute
                  exact
                  path="/add-book"
                  component={AddBook}
                  {...props}
                />

                {/* <Route exact path="/add-book" component={AddBook} /> */}

                <PrivateRoute
                  exact
                  path="/edit-book/:bookId"
                  component={EditBook}
                  {...props}
                />

                {/* <Route exact path="/edit-book/:bookId" component={EditBook} /> */}

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
};
/* 
const mapStateToProps = (state) => {
  return state.authUser;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: () => dispatch(GET()),
  };
};
*/
const MainComponent = withRouter(AppRouter);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainComponent />
      </Router>
    </Provider>
  );
};

export default App;
