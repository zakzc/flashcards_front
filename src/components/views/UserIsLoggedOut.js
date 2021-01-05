import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserIsLoggedOut = () => {
  return (
    <React.Fragment>
      <h2>This operation is only possible if the user is logged in </h2>
      <p>Please go to Log in / Sign up page</p>

      <Route>
        <Redirect to="/logIn" />
      </Route>
    </React.Fragment>
  );
};

export default UserIsLoggedOut;
