import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, authUser, ...rest }) => {
  console.log("PRIVATE ROUTES", authUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser.isLoggedIn && authUser.user.role === "writer" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
