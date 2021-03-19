import React, { useState } from "react";
import Menu from "./Menu";

export default function Burger() {
  const [burgerToggle, setBurgerToggle] = useState(false);
  // const [burgerView, setBurgerView] = useState("closed");

  return (
    <div id="burger">
      <button
        className={burgerToggle ? "change" : "closed"}
        onClick={() => setBurgerToggle(!burgerToggle)}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      {burgerToggle && <Menu />}
    </div>
  );
}
// TODO: find a way of displaying the actual menubar.
