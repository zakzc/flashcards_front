import React from "react";
import Enzyme from "enzyme";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import StackManagement from "../components/StackManagement";
import AddNewStack from "../components/StackManagement/AddNewStack";

Enzyme.configure({ adapter: new Adapter() });

// Parent
describe("\n __| Stack Management |__", () => {
  const stackManagement = shallow(<StackManagement />);

  describe("Initialization process", () => {
    it("Renders the CardSet component", () => {
      expect(stackManagement).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(stackManagement.state().add).toEqual(true);
      expect(stackManagement.state().export).toEqual(false);
      expect(stackManagement.state().delete).toEqual(false);
    });

    describe("Imports", () => {
      test("RemoveCurStack", () => {
        expect(stackManagement.find("RemoveCurStack")).toBeTruthy();
      });
      test("AddNewStack", () => {
        expect(stackManagement.find("AddNewStack")).toBeTruthy();
      });
      test("ExportStack", () => {
        expect(stackManagement.find("ExportStack")).toBeTruthy();
      });
      test("UserIsLoggedOut", () => {
        expect(stackManagement.find("UserIsLoggedOut")).toBeTruthy();
      });
      describe("Svg imports", () => {
        test("Plus", () => {
          expect(stackManagement.find("Plus")).toBeTruthy();
        });
        test("Trash", () => {
          expect(stackManagement.find("Trash")).toBeTruthy();
        });
        test("Export", () => {
          expect(stackManagement.find("Export")).toBeTruthy();
        });
      });
    });
  });
});

// Children
describe("\n- -> | Add New Stack (child) | ", () => {
  const addNewStack = shallow(<AddNewStack />);

  describe("\tInitialization process", () => {
    it("Renders the ManageCards component", () => {
      expect(addNewStack).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(addNewStack.state().frontValue).toEqual("");
      expect(addNewStack.state().backValue).toEqual("");
      expect(addNewStack.state().newFront).toEqual("");
      expect(addNewStack.state().newBack).toEqual("");
      expect(addNewStack.state().newStackName).toEqual("");
      expect(addNewStack.state().newCardsToStack).toEqual([]);
      expect(addNewStack.state().readyToSend).toEqual(true);
      expect(addNewStack.state().numberOfCardsAdded).toEqual(0);
      expect(addNewStack.state().redirect).toEqual(false);
    });

    describe("Imports", () => {
      test("useDB_Connection", () => {
        expect(addNewStack.find("useDB_Connection")).toBeTruthy();
      });
      describe("Svg imports", () => {
        test("Consolidate", () => {
          expect(addNewStack.find("Consolidate")).toBeTruthy();
        });
        describe("Svg imports", () => {
          test("Plus", () => {
            expect(addNewStack.find("Plus")).toBeTruthy();
          });
        });
        describe("Svg imports", () => {
          test("Right", () => {
            expect(addNewStack.find("Right")).toBeTruthy();
          });
        });
      });
    });
  });
});

// import useDB_Connection from "../../Data/DB-hook/connection-hook";
// import { CheckForInvalidCharacters } from "../../Data/Validation/validate";
// // Icons
// import Consolidate from "../icons/consolidate";
// import Plus from "../icons/plus";
// import Right from "../icons/right";
