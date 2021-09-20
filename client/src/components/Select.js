import React from "react";

export default function Select(props) {
  return (
    <select
      className="form-select form-select-lg mb-3"
      aria-label=".form-select-lg example"
      name={props.passed}
      id={props.passed}
      required
    >
      <option value=""> Open this select menu</option>
      <option value="1">Very Bad 😡</option>
      <option value="2">Not Good 🙁</option>
      <option value="3">Average 🙂</option>
      <option value="4">Good 😄</option>
      <option value="5">Very Good 😍</option>
    </select>
  );
}
