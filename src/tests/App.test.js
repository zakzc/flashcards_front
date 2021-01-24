import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
///
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("App tests", () => {
  const app = shallow(<App />);

  it("Renders the App", () => {
    expect(app).toMatchSnapshot();
  });

  it("Initializes the State", () => {
    expect(app.state().userIsLoggedIn).toEqual(false);
    expect(app.state().currentUser).toEqual("");
    expect(app.state().currentStack).toEqual("");
  });
});
