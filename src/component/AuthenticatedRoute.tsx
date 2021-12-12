import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

export const AuthenticatedRoute: React.FC<any> = ({
  component: C,
  ...props
}) => {
  const { isAuthenticated } = useAuthState();
  return props.children ? (
    <Route
      {...props}
      children={() =>
        isAuthenticated ? props.children : <Redirect to="/login" />
      }
    />
  ) : (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};
