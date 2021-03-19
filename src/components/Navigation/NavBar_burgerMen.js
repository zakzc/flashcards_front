import React, { useState } from "react";
import Menu from "./Menu";

export default function Burger() {
  const [burgerToggle, setBurgerToggle] = useState(false);

  return (
    <>
      <button className="show" onClick={() => setBurgerToggle(!burgerToggle)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      {burgerToggle && <Menu />}
    </>
  );
}
// TODO: find a way of displaying the actual menubar.
