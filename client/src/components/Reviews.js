import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../Cover/Loader";
import ReviewCard from "./ReviewCard";
import norev from "../logos/Customer Survey-rafiki.svg";
import AddReview from "./AddReview";
export default function Reviews() {
  const [info, setinfo] = useState({});
  const [revw, setrevw] = useState([]);
  const [loading, setloading] = useState(true);

  let { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    const fetchReview = () => {
      const urr = `/api/v1/reviews/${id}`;
      axios
        .get(urr)
        .then((res) => {
          setinfo(res.data.data);
          setrevw(res.data.data.reviews);
          setloading(false);
        })
        .catch(() => {
          history.push("/");
        });
    };
    fetchReview();
  }, [id, history]);

  useEffect(() => {
    window.scroll(0, 0);
    return () => {
      setinfo({});
      setrevw([]);
      setloading(true);
    };
  }, []);

  const { address, bank_name, branch } = info;

  return (
    <div className="card">
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4 ">
          <h1>Reviews</h1>
          <span className="d-flex m-0">
            <div style={{ width: "40%" }} className="underline"></div>
            <span className=""></span>
            <hr style={{ width: "100%", height: "4px" }} className="m-0"></hr>
            <hr></hr>
          </span>
          <div className="inner-card">
            <div className="rescard">
              <h2 className="m-2">
                <b>{bank_name}</b>
              </h2>
              <h4 className="m-2">
                <b>Branch:</b> {branch}
              </h4>
              <h4 className="m-2">
                <b>Address:</b> {address}
              </h4>
            </div>
          </div>
          {localStorage.getItem("usern") != null ? (
            <div>
              <div className="invite">
                <h5>
                  If You Have A Bank Account Here, Do Share Your Experience With
                  Others!
                </h5>
              </div>
              <AddReview />
            </div>
          ) : (
            <div style={{ textAlign: "center" }} className="invite">
              <a href="/signup">Wanna Add Some Reviews? {">>"}</a>
            </div>
          )}
          <hr />

          {revw.length === 0 ? (
            <React.Fragment>
              <div className="invite">
                <h3 className="mt-4">No reviews Yet.</h3>
                {/* <hr /> */}
                {localStorage.getItem("usern") != null ? null : (
                  <div>
                    <h4 className="mt-4 mapadd">
                      <i>Why Don't You Be The First?</i>
                    </h4>
                    {/* <div style={{ textAlign: "center" }} className="invite">
                      <a href="/signup">Wanna Add Some Reviews? {">>"}</a>
                    </div> */}
                  </div>
                )}
                <img
                  src={norev}
                  alt="Picutre"
                  style={{ height: "600px", width: "720px" }}
                  className="Picture"
                ></img>
              </div>
            </React.Fragment>
          ) : (
            revw.map((each, index) => <ReviewCard details={each} key={index} />)
          )}
        </div>
      )}
    </div>
  );
}
