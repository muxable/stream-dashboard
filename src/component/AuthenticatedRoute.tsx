import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

export const AuthenticatedRoute: React.FC<any> = ({
  component: C,
  ...props
}) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
