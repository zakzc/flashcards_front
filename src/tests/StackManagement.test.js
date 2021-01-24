import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
///
import StackManagement from "../components/StackManagement";

Enzyme.configure({ adapter: new Adapter() });

describe("StackManagement tests", () => {
  const stackManagement = shallow(<StackManagement />);

  it("Renders the CardSet component", () => {
    expect(stackManagement).toMatchSnapshot();
  });

  it("Initializes the State", () => {
    expect(stackManagement.state().add).toEqual(true);
    expect(stackManagement.state().export).toEqual(false);
    expect(stackManagement.state().delete).toEqual(false);
  });
});

//  add: true,
//   export: false,
//   delete: false,
