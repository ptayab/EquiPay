import React, { useState, useEffect } from "react";
import "../styles/add_expense.css";

function AddExpense(props) {
  // Reactive variables for dynamic styling
  let [containerClass, setContainerClass] = useState("add-expense-container");
  let [overflowClass, setOverflowClass] = useState("overflow-container");

  // Holds 'add expense' button state
  let [btnDisabled] = useState(true);

  // Holds borrower state
  let [borrowers] = useState([]);

  // Calculates height to transition to when borrower is added / removed
  function calcHeight() {
    if (
      overflowClass.includes("overflow-container-expand") &&
      borrowers.length > 0
    ) {
      let calc = borrowers.length * 2.5 + 11;
      return calc + "em";
    } else if (overflowClass.includes("overflow-container-expand")) {
      return "9.8em";
    } else {
      return "0em";
    }
  }

  // Expands add-expense container to make room for input fields
  function expandContainer() {
    if (overflowClass.includes("expand")) {
      setOverflowClass("overflow-container");
      setContainerClass("add-expense-container");
    } else {
      setContainerClass("add-expense-container add-expense-container-expand");
      setOverflowClass("overflow-container overflow-container-expand");
    }
  }

  // Returns styles to grey out button
  function disabledBtnStyles() {
    if (btnDisabled) {
      return {
        backgroundColor: "lightgrey",
        boxShadow: "0 5px 0 grey",
        transform: "none",
        opacity: "20%",
      };
    }
  }

  return (
    <div>
      <div
        style={{
          maxHeight: calcHeight(),
        }}
        className={overflowClass}
      >
        <div className="input-container">
          <header className="add-expense-title">Title</header>
          <input
            maxLength="50"
            className="title-input"
          ></input>
        </div>
        <div className="input-container">
          <header className="add-expense-amount">Amount</header>
          <input
            placeholder="$"
          ></input>
        </div>
      </div>
      <div className={containerClass}>
        <div className="button-container">
          <button onClick={expandContainer} className="ge-button">
            Add Expense
          </button>
          <button
            disabled={btnDisabled}
            className="ge-button"
            style={disabledBtnStyles()}
            onClick={() => {
              props.onClick({});
            }}
          >
            Confirm Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
