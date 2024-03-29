import React from "react";
import Enzyme from "enzyme";
///
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
///
import CardSet from "../components/CardSet/CardSet_0";
import Stats from "../components/CardSet/CardSet_Stats";

Enzyme.configure({ adapter: new Adapter() });

// Parent
describe("\n __| CardSet |__", () => {
  const cardSet = shallow(<CardSet />);

  describe("Initialization process", () => {
    it("Renders the CardSet component", () => {
      expect(cardSet).toMatchSnapshot();
    });

    it("Initializes the State", () => {
      expect(cardSet.state().face).toEqual(true);
      expect(cardSet.state().right).toEqual(0);
      expect(cardSet.state().wrong).toEqual(0);
      expect(cardSet.state().stackIsOver).toEqual(false);
    });

    describe("Imports", () => {
      test("UserIsLoggedOut", () => {
        expect(cardSet.find("UserIsLoggedOut")).toBeTruthy();
      });
      test("Stats", () => {
        expect(cardSet.find("Stats")).toBeTruthy();
      });
      test("Score", () => {
        expect(cardSet.find("Score")).toBeTruthy();
      });
      describe("Svg imports", () => {
        test("Check", () => {
          expect(cardSet.find("Check")).toBeTruthy();
        });
        test("Right", () => {
          expect(cardSet.find("Right")).toBeTruthy();
        });
        test("Wrong", () => {
          expect(cardSet.find("Wrong")).toBeTruthy();
        });
      });
    });
  });
});

// Child
describe("\n___| Stats |___ ", () => {
  const right = 5;
  const wrong = 2;
  const guesses = right + wrong;
  const percentage = right / (right + wrong);
  const stats = shallow(
    <Stats
      right={right}
      wrong={wrong}
      guesses={guesses}
      percentage={percentage}
    />
  );

  describe("\tInitialization process", () => {
    it("Renders the ManageCards component", () => {
      expect(stats).toMatchSnapshot();
    });

    describe("\tImports", () => {
      describe("\tSvg imports", () => {
        test("RewindIcon", () => {
          expect(stats.find("RewindIcon")).toBeTruthy();
        });
        test("StatsIcon", () => {
          expect(stats.find("StatsIcon")).toBeTruthy();
        });
      });
    });
  });
});
