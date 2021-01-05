import React from "react";

const NoUserLoggedIn = () => {
  return (
    <React.Fragment>
      <h2>Management of Stacks is only possible if user is logged in </h2>
      <p>Please go to Log in / Sign up page</p>
    </React.Fragment>
  );
};

export default NoUserLoggedIn;
