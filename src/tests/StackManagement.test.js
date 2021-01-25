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

describe("StackManagement component", () => {
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
