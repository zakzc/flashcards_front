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

describe("CurrentStack component", () => {
  const currentStack = shallow(<CurrentStack />);

  describe("Initialization process", () => {
    it("Renders the CardSet component", () => {
      expect(currentStack).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(currentStack.state().readOrSelect).toEqual(true);
      expect(currentStack.state().update).toEqual(false);
    });
    describe("Imports", () => {
      test("ReadCards", () => {
        expect(currentStack.find("ReadCards")).toBeTruthy();
      });
      test("SelectNewStack", () => {
        expect(currentStack.find("SelectNewStack")).toBeTruthy();
      });
      test("UserIsLoggedOut", () => {
        expect(currentStack.find("UserIsLoggedOut")).toBeTruthy();
      });
      describe("Svg imports", () => {
        test("Collection", () => {
          expect(currentStack.find("Collection")).toBeTruthy();
        });
        test("CheckEye", () => {
          expect(currentStack.find("CheckEye")).toBeTruthy();
        });
      });
    });
  });
});

// import ReadCards from "./CurrentStack/ReadCards";
// import SelectNewStack from "./CurrentStack/SelectNewStack";
// // Standard Log out page
// import UserIsLoggedOut from "./views/UserIsLoggedOut";
// // Style
// import "../../src/index.css";
// // Icons
// import Collection from "./icons/collection";
// import CheckEye from "./icons/checkEye";
