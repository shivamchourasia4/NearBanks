import React from "react";
import SearchByCity from "../components/SearchCity";
import SearchIfsc from "../components/SearchIfsc";

export default function SearchGroup() {
  return (
    <div className="card">
      <div className="searchcover container">
        {/* <div className="p-0 underline"> */}
        <h1>Search </h1>
        <span className="d-flex m-0">
          <div style={{ width: "20%" }} className="underline"></div>
          <span className=""></span>
          <hr style={{ width: "100%", height: "4px" }} className="m-0"></hr>
          <hr></hr>
        </span>
        <SearchByCity />
        <span className="d-flex">
          <hr style={{ width: "50%" }}></hr>
          <span className="mx-4">
            <h3>Or</h3>
          </span>
          <hr style={{ width: "50%" }}></hr>
          <hr></hr>
        </span>
        <SearchIfsc />
      </div>
    </div>
  );
}
