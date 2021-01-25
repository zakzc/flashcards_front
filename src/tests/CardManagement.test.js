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

describe("CardManagement Component", () => {
  const cardManagement = shallow(<CardManagement />);

  describe("Initialization process", () => {
    it("Renders the CardSet component", () => {
      expect(cardManagement).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(cardManagement.state().addOrManage).toEqual(false);
    });

    describe("Imports", () => {
      test("UserIsLoggedOut", () => {
        expect(cardManagement.find("UserIsLoggedOut")).toBeTruthy();
      });
      test("ManageCards", () => {
        expect(cardManagement.find("ManageCards")).toBeTruthy();
      });
    });
  });
});
