import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

export const UnauthenticatedRoute: React.FC<any> = ({
  component: C,
  ...props
}) => {
  const { isAuthenticated } = useAuthState();
  return props.children ? (
    <Route
      {...props}
      children={() => (!isAuthenticated ? props.children : <Redirect to="/" />)}
    />
  ) : (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
