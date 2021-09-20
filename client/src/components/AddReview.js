import React, { useState } from "react";
import Select from "./Select";
import axios from "axios";
import { useParams } from "react-router-dom";
import highfive from "../logos/High five-bro.svg";

export default function AddReview() {
  let { id } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const postReview = (event) => {
    event.preventDefault();
    const form = event.target;
    var data = {};
    for (let i = 0; i < form.elements.length; i++) {
      const elem = form.elements[i];
      data[elem.name] = elem.value;
    }

    const getName = () => {
      const url = `/nearbanks/auth/user/${localStorage.getItem("usern")}`;
      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("tokenn") },
        })
        .then((res) => {
          console.log(res);
          data["firstname"] = res.data.firstname;
          data["lastname"] = res.data.lastname;
          axios
            .post(
              `/api/v1/reviews/${id}`,
              {
                body: data,
              },
              {
                headers: { "x-auth-token": localStorage.getItem("tokenn") },
              }
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };

    getName();
    document.getElementById("formreset").reset();
    setSubmitted(true);
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {submitted ? (
        <div className="gogreen">
          <span>
            <h1>Thank You For The Review!</h1>
            <hr />
          </span>{" "}
          <div style={{ color: "black" }} className="searcholder">
            <div className=" m-4 mapadd greet">
              <h5>We Appericiate Your Sweet Review.</h5>
              <h5>We Also Hope That People Will Find Your Review Helpful.</h5>
              <h5>Have A Great Day!</h5>
            </div>
            {/* <br /> */}
            <img
              src={highfive}
              alt="highfive"
              style={{ height: "400px", width: "520px" }}
              className="Picture"
            ></img>
          </div>
        </div>
      ) : (
        <div className="card addrev p-5">
          <div className="container">
            <form onSubmit={postReview} id="formreset">
              <label htmlFor="services">
                <h4>What Product/Services Have You Taken?</h4>
              </label>
              <input
                type="text"
                name="services"
                id="services"
                className="forminput"
                placeholder="Eg. Savings Account, Current Account, Fixed Deposit, Home Loan, Educational Loan, etc."
                required
              ></input>
              <label htmlFor="support">
                <h4>How Is Customer Support Of This Bank?</h4>
              </label>
              <Select passed="support" />
              <label htmlFor="atm">
                <h4>How Is The ATM Availability Of This Bank?</h4>
              </label>
              <Select passed="atm" />
              <label passed="Resp">
                <h4>How Is The Responsiveness Of This Bank?</h4>
              </label>
              <Select passed="Resp" />
              <label passed="Interest">
                <h4>How Is The Promised Interest Rate Of This Bank?</h4>
              </label>
              <Select passed="Interest" />
              <label htmlFor="Fee">
                <h4>How Is The Fees & Charge Of This Bank?</h4>
              </label>
              <Select passed="Fee" />
              <label htmlFor="Review">
                <h4>Write Your Review.</h4>
              </label>
              <textarea
                type="text"
                className="forminput"
                name="Review"
                id="Review"
                required
              ></textarea>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  required
                ></input>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  <small>
                    I certify that this review is based on my own experience and
                    is my genuine opinion of this service provider, and that I
                    have no personal or business relationship with this
                    establishment, and have not been offered any incentive or
                    payment originating from the establishment to write this
                    review.
                  </small>
                </label>
                <button type="submit" className="butno">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
