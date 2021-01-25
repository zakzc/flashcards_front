import React from "react";
import Enzyme from "enzyme";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import CurrentStack from "../components/CurrentStack";
import SelectNewStack from "../components/CurrentStack/SelectNewStack";

Enzyme.configure({ adapter: new Adapter() });

// Parent
describe("\n __| Current Stack |__", () => {
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

// Child
describe("\n- -> | Select New Stack (child) | ", () => {
  const selectNewStack = shallow(<SelectNewStack />);

  describe("\tInitialization process", () => {
    it("Renders the ManageCards component", () => {
      expect(selectNewStack).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(selectNewStack.state().chosenStackId).toEqual("");
      expect(selectNewStack.state().chosenStackName).toEqual("");
      expect(selectNewStack.state().confirmation).toEqual(false);
      expect(selectNewStack.state().redirect).toEqual(false);
    });
  });
});
