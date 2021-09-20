import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LeafletContext } from "../Cover/ParentCover";

export default function ResultsCard(props) {
  const leafletContext = useContext(LeafletContext);
  const history = useHistory();
  const { address, bank_name, branch, city, district, ifsc, state, _id } =
    props.detail;

  const Locate = () => {
    leafletContext.LeafletDispatcher({
      type: "SETLOCATION",
      payload: { add: address, region: state, cty: city },
    });

    history.push("/map");
  };

  const SeeReview = () => {
    history.push(`/review/${_id}`);
  };

  return (
    <div className="card rescover m-3 p-5 shadow">
      <h2 style={{ color: "black" }}>
        <b>{bank_name}</b>
      </h2>
      <span className="d-flex m-0">
        <div
          style={{ width: "40%" }}
          className="underline underline-blue"
        ></div>
        <span className=""></span>
        <hr
          style={{ width: "100%", height: "4px", color: "darkgrey" }}
          className="m-0"
        ></hr>
        <hr></hr>
      </span>
      <div className="inner-card">
        <div className="rescard">
          <h4 className="m-2">
            <b>Branch:</b> {branch}
          </h4>
          <h4 className="m-2">
            <b>Address:</b> {address}
          </h4>
          <h4 className="m-2">
            <b>State:</b> {state}
          </h4>
          <h4 className="m-2">
            <b>City:</b> {city}
          </h4>
          <h4 className="m-2">
            <b>District: </b>
            {district}
          </h4>
          <h4 className="m-2">
            <b>IFSC:</b> {ifsc}
          </h4>
        </div>
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="butno m-2" onClick={Locate}>
            View On Map
          </button>
          <button className="butno butno-black m-2" onClick={SeeReview}>
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
