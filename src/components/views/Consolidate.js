import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "./Loader";

// const RedirectFlow = () => {
//   console.log("is it working?");
//   return <Redirect to="/" />;
// };

const Consolidate = () => {
  return (
    <React.Fragment>
      <div id="Consolidate">
        <h1>Consolidating changes</h1>
        <div id="loaderPositioning" timeout="{5000}">
          <Loader />
        </div>
        <p> Navigate to desired link</p>
        {setTimeout(<Loader />, 3000)}
      </div>
    </React.Fragment>
  );
};

setTimeout(Consolidate, 2000);

export default Consolidate;
