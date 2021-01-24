import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
///
import CurrentStack from "../components/CurrentStack";

Enzyme.configure({ adapter: new Adapter() });

describe("CurrentStack tests", () => {
  const currentStack = shallow(<CurrentStack />);

  it("Renders the CardSet component", () => {
    expect(currentStack).toMatchSnapshot();
  });

  it("Initializes the State", () => {
    expect(currentStack.state().readOrSelect).toEqual(true);
    expect(currentStack.state().update).toEqual(false);
  });
});

//  currentUser: props.currentUser,
//   userIsLoggedIn: props.userIsLoggedIn,
//   userStacks: props.userStacks,
//   currentStack: props.currentStack,
//   readOrSelect: true,
//   update: false,
