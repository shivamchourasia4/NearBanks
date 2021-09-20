import React, { useEffect, useState } from "react";
import GetEmoji from "./GetEmoji";
import supporticon from "../logos/support.svg";
import atmicon from "../logos/atm-machine.svg";
import respicon from "../logos/answer.svg";
import feeicon from "../logos/courier-charge.svg";
import interesticon from "../logos/money.svg";

export default function ReviewCard(props) {
  const {
    firstname,
    lastname,
    support,
    review,
    timestamp,
    atm,
    Resp,
    Interest,
    Fee,
    services,
  } = props.details;

  const [datestamp, setDatestamp] = useState("");
  const [isHelpful, setisHelpful] = useState(false);

  useEffect(() => {
    var st = new Date(timestamp);
    var d = st.getDate();
    var m = st.getMonth() + 1;
    var y = st.getFullYear();
    setDatestamp(d + "/ " + m + "/ " + y);
    return () => {};
  }, [timestamp]);

  const clicked = () => {
    setisHelpful(true);
  };

  return (
    <div className="forminput" style={{ textAlign: "center" }}>
      <div className="">
        <h4 className="m-4">Product/ Service Taken : {services}</h4>
        <hr />
        <div className="px-4 ratings row">
          <div className="emojis col shadow">
            <img src={supporticon} alt="icon" className="revicon"></img>
            <h5>Customer Support</h5>
            <GetEmoji score={support} />
          </div>
          <div className="emojis col shadow">
            <img src={atmicon} alt="icon" className="revicon"></img>
            <h5>ATM Availability</h5>
            <GetEmoji score={atm} />
          </div>
          <div className="emojis col shadow">
            <img src={respicon} alt="icon" className="revicon"></img>
            <h5>Responsiveness</h5>
            <GetEmoji score={Resp} />
          </div>
          <div className="emojis col shadow">
            <img src={feeicon} alt="icon" className="revicon"></img>
            <h5>Fee & Charge</h5>
            <GetEmoji score={Fee} />
          </div>
          <div className="emojis col shadow">
            <img src={interesticon} alt="icon" className="revicon"></img>
            <h5>Promised Interest Rate</h5>
            <GetEmoji score={Interest} />
          </div>
        </div>
        <div className="p-2">
          <h5>
            "<i>{review}</i>"
          </h5>
        </div>
        {/* <br />
        <span>
          Was This Review Helpful?
          <button className="butno-black m-1">YES</button>
        </span> */}
      </div>
      <div className="p-2 who">
        <i>
          {firstname} {lastname}
        </i>{" "}
        Reviwed On <i>{datestamp}</i>
      </div>
      {!isHelpful ? (
        <div className="m-2">
          <small>Was This Review Helpful?</small>
          <button className="butno butno-black help" onClick={clicked}>
            <small>YES</small>
          </button>
          <button className="butno help" onClick={clicked}>
            <small>NO</small>
          </button>
        </div>
      ) : (
        <div className="gogreen">
          <h5 className="m-0">Thank You For The Feedback!</h5>
        </div>
      )}
    </div>
  );
}
