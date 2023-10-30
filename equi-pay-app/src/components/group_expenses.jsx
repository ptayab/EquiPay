import React, { useState, createRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";


import AddExpense from "./add_expense";


function GroupExpenses(props) {

  // Add expense 
  async function addExpense(expense) {

 
  }

  return (
    <div className="group-expenses-container">
      <h1 className="group-name">{props.group.name}</h1>
      <h2 className="balance">
        {props.group.usersMinusActive.outstandingBalance > 0
          ? "You owe: "
          : "You are owed: "}
        <span
          style={{
            backgroundColor:
              props.group.usersMinusActive.outstandingBalance === 0
                ? "lightgrey"
                : "",
          }}
          className={
            props.group.usersMinusActive.outstandingBalance > 0
              ? "balance-value user-balance-red"
              : "balance-value user-balance-green"
          }
        >
          {props.group.usersMinusActive.outstandingBalance < 0
            ? "$" +
              String(
                (props.group.usersMinusActive.outstandingBalance / 100).toFixed(
                  2
                )
              ).substring(1)
            : "$" +
              (props.group.usersMinusActive.outstandingBalance / 100).toFixed(
                2
              )}
        </span>
      </h2>
        <AddExpense
          onClick={(expense) => {
            addExpense(expense);
          }}
          groupUsers={props.group.users}
          usersMinusActive={props.group.usersMinusActive}
        ></AddExpense>
        <TransitionGroup component={null}>
        </TransitionGroup>
    </div>
  );
}

export default GroupExpenses;
