import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
///
import CardManagement from "../components/CardManagement";

Enzyme.configure({ adapter: new Adapter() });

describe("CardManagement tests", () => {
  const cardManagement = shallow(<CardManagement />);

  it("Renders the CardSet component", () => {
    expect(cardManagement).toMatchSnapshot();
  });

  it("Initializes the State", () => {
    expect(cardManagement.state().addOrManage).toEqual(false);
  });
});

//   userIsLoggedIn: props.userIsLoggedIn,
//   currentUser: props.currentUser,
//   currentStack: props.currentStack,
//   addOrManage: false,
