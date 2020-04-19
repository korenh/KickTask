import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth";

export const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isauthenticated()) {
          return <Component {...props} />;
        }
      }}
    />
  );
};
