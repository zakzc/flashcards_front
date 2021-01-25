import React from "react";
import Enzyme from "enzyme";
// import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("\n __| App Component |__ ", () => {
  const app = shallow(<App />);

  describe("Initialization process", () => {
    it("Renders the App", () => {
      expect(app).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(app.state().userIsLoggedIn).toEqual(false);
      expect(app.state().currentUser).toEqual("");
      expect(app.state().currentStack).toEqual("");
    });

    describe("Imports", () => {
      test("Navigation", () => {
        expect(app.find("Navigation")).toBeTruthy();
      });
      test("Title", () => {
        expect(app.find("Title")).toBeTruthy();
      });
      test("StackManagement", () => {
        expect(app.find("StackManagement")).toBeTruthy();
      });
      test("CardManagement", () => {
        expect(app.find("CardManagement")).toBeTruthy();
      });
      test("LogInPage", () => {
        expect(app.find("LogInPage")).toBeTruthy();
      });
      test("CurrentStack", () => {
        expect(app.find("CurrentStack")).toBeTruthy();
      });
      test("ConsolidateChanges", () => {
        expect(app.find("ConsolidateChanges")).toBeTruthy();
      });
      test("CardSet", () => {
        expect(app.find("CardSet")).toBeTruthy();
      });
      test("useDB_Connection", () => {
        expect(app.find("useDB_Connection")).toBeTruthy();
      });
      test("updateCurrentStack", () => {
        expect(app.find("updateCurrentStack")).toBeTruthy();
      });
      test("updateUserData", () => {
        expect(app.find("updateUserData")).toBeTruthy();
      });
    });
  });
});
