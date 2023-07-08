import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  isLoggedIn,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn)
          return (
            <Redirect
              to={{
                pathname: "/signin",
                calledRoute: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func,
  render: PropTypes.func,
  location: PropTypes.object,
};

export default ProtectedRoute;
