import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
///
import CardSet from "../components/CardSet";

Enzyme.configure({ adapter: new Adapter() });

describe("CardSet tests", () => {
  const cardSet = shallow(<CardSet />);

  it("Renders the CardSet component", () => {
    expect(cardSet).toMatchSnapshot();
  });

  it("Initializes the State", () => {
    expect(cardSet.state().face).toEqual(true);
    expect(cardSet.state().right).toEqual(0);
    expect(cardSet.state().wrong).toEqual(0);
    expect(cardSet.state().stackIsOver).toEqual(false);
  });
});
