import React from "react";
import Enzyme from "enzyme";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import CardManagement from "../components/CardManagement";
import ManageCards from "../components/CardManagement/ManageCards";

Enzyme.configure({ adapter: new Adapter() });

// Parent

describe("\n __| CardManagement |__ ", () => {
  const cardManagement = shallow(<CardManagement />);

  describe("Initialization", () => {
    it("Matches snapshot", () => {
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

// Child
describe("\n  ___| ManageCards |___ ", () => {
  const manageCards = shallow(<ManageCards />);

  describe("\tInitialization process", () => {
    it("Renders the ManageCards component", () => {
      expect(manageCards).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(manageCards.state().cardForEditing).toEqual("");
      expect(manageCards.state().cardForEditingId).toEqual("");
      expect(manageCards.state().tempNewFront).toEqual("");
      expect(manageCards.state().tempNewBack).toEqual("");
      expect(manageCards.state().newStack).toEqual("");
      expect(manageCards.state().editingMode).toEqual(false);
      expect(manageCards.state().updatedItemMessage).toEqual(false);
    });

    describe("\tImports", () => {
      test("updateCards", () => {
        expect(manageCards.find("updateCards")).toBeTruthy();
      });
      describe("\tSvg imports", () => {
        test("Consolidate", () => {
          expect(manageCards.find("Consolidate")).toBeTruthy();
        });
        test("EditCardIcon", () => {
          expect(manageCards.find("EditCardIcon")).toBeTruthy();
        });
      });
    });
  });
});
