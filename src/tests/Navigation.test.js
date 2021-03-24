import React from "react";
import Enzyme from "enzyme";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import Navigation from "../components/Navigation/NavBar_0";

Enzyme.configure({ adapter: new Adapter() });

// Navigation
describe("\n __| Navigation |__", () => {
  const navigation = shallow(<Navigation />);

  describe("Initialization process", () => {
    it("Renders the Navigation", () => {
      expect(navigation).toMatchSnapshot();
    });

    describe("Imports", () => {
      describe("Svg imports", () => {
        test("Pile", () => {
          expect(navigation.find("Pile")).toBeTruthy();
        });
        test("Play", () => {
          expect(navigation.find("Play")).toBeTruthy();
        });
        test("EditCard", () => {
          expect(navigation.find("EditCard")).toBeTruthy();
        });
        test("EditStacks", () => {
          expect(navigation.find("EditStacks")).toBeTruthy();
        });
        test("LogOut", () => {
          expect(navigation.find("LogOut")).toBeTruthy();
        });
        test("LogIn", () => {
          expect(navigation.find("LogIn")).toBeTruthy();
        });
      });
    });
  });
});

// Logged in navigation
// const navLogInProps = {
//   currentUser: {
//     firstName: "Test",
//   },
//   userIsLoggedIn: true,
// };
// const NavBar = shallow(<Navigation {...navLogInProps} />);

// describe("Test different Views", () => {
//   test("Logged In NavBar on true for user logged in", () => {
//     const Navigation = NavBar.find("#navigation");
//     console.log("NAV", Navigation);
//     expect(Navigation).toContain("#LogOutNavBar");
//   });
// });
