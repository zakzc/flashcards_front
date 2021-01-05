//import React from "react";

export const validateEmail = (eMail) => {
  // no input
  if (!CheckInput(eMail) === true) {
    return false;
  } else {
    // invalid characters
    if (CheckForInvalidCharacters(eMail) === false) {
      return false;
    } else {
      // email formatting
      console.log("input was true");
      // backspace has to be doubled, since it is inside a string
      //let pattern = new RegExp("^\\w+@\\w+.\\w+$");
      const pattern = /^\w+@\w+\.\w+$/;
      if (pattern.test(eMail) === false) {
        return false;
      } else {
        return true;
      }
    }
  }
};

export const validatePasswordInput = (pswInput) => {
  console.log("validate input: ", pswInput);
  if (CheckInput(pswInput) === true) {
    if (CheckForInvalidCharacters(pswInput) === true) {
      return true;
    }
  }
  return false;
};

const CheckInput = (inputToCheck) => {
  let validInput = inputToCheck.trim().length >= 4;
  if (validInput) {
    return true;
  } else {
    return false;
  }
};

const CheckForInvalidCharacters = (dataToCheck) => {
  let invalidCharacters = [
    ">",
    "<",
    "{",
    "}",
    "=",
    "(",
    ")",
    "?",
    "!",
    "$",
    "#",
    "/",
    "|",
    "&",
    "\b",
    "\t",
  ];
  let invalidInput = invalidCharacters.map((c) => dataToCheck.includes(c));
  if (invalidInput.includes(true)) {
    console.log("wrong input");
    return false;
  } else {
    return true;
  }
};
