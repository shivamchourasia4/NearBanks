import React, { useEffect, useContext, useState } from "react";
import { SearchContext } from "../Cover/ParentCover";
import ResultsCard from "./ResultsCard";
import axios from "axios";
import Loader from "../Cover/Loader";
import notfound from "../logos/Search-amico.svg";

function SearchResults() {
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [noResuts, setnoResults] = useState(0);
  const [results, setResults] = useState({});
  const searchContext = useContext(SearchContext);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  const { bank, city, ifsc } = searchContext.index;
  useEffect(() => {
    const fetchData = () => {
      var url = `/api/v1/city/search?bank_name=${bank}&city=${city}`;
      axios
        .get(url)
        .then((res) => {
          setnoResults(res.data.count);
          setResults(res.data.data);
          setSpinner(false);
          var tbs = document.getElementById("results");
          tbs.scrollIntoView(true);
        })
        .catch((err) => console.log(err));
    };

    // var tbs = document.getElementById("results");
    // tbs.scrollIntoView(true);

    if (bank.length > 0 && city.length > 0) {
      setLoading(false);
      setSpinner(true);
      fetchData();
    }
    return () => {
      setLoading(true);
      setSpinner(true);
    };
  }, [bank, city]);

  useEffect(() => {
    const fetchData = () => {
      var url = `/api/v1/ifsc/search?ifsc=${ifsc}`;
      axios
        .get(url)
        .then((res) => {
          setnoResults(res.data.count);
          setResults(res.data.data);
          setSpinner(false);
          var tbs = document.getElementById("results");
          tbs.scrollIntoView(true);
        })
        .catch((err) => console.log(err));
    };
    if (ifsc.length > 0) {
      fetchData();
      setLoading(false);
      setSpinner(true);
    }
    return () => {
      setLoading(true);
      setSpinner(true);
    };
  }, [ifsc]);

  return (
    <div id="results" className="panel m-0">
      {loading ? (
        <div>
          {!localStorage.getItem("usern") ? (
            <div className="panel-inner">
              <p id="big">Your Reviews Matter!</p>
              <span className="m-2">
                <h2>
                  We At NearBanks, Aim To Provide People The Best Info We Can,
                  So That People Can Make Smarter Choices.
                </h2>
              </span>
              <span className="m-2">
                <h5>
                  Help Us Grow By Providing Your Valuable Reviews And Ratings.
                </h5>
              </span>
              <a href="/signup" className="nounderline btnlink m-2">
                <span className="butno butno-black noborder py-3" to="/signup">
                  Sign Up
                </span>
              </a>
            </div>
          ) : (
            <div className="panel-inner">
              <p id="big">Suggestions?</p>
              <span className="m-2">
                <h2>
                  We Would Love To Hear Your Thoughts, Suggestions, Concerns Or
                  Problems With Anything So We Can Improve!
                </h2>
              </span>
              {/* <span className="m-2">
                <h5>We Would To Love To Hear From You!</h5>
              </span> */}
              <a
                href="https://github.com/shivamchourasia4/"
                className="nounderline btnlink m-2"
              >
                <span className="butno butno-black noborder py-3" to="/signup">
                  Give FeedBack
                </span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div>
          {spinner ? (
            <Loader />
          ) : (
            <div>
              {" "}
              {noResuts === 0 ? (
                <div className="container pt-4 ">
                  <h1>
                    <i>"{noResuts}"</i> Search Results for{" "}
                    {bank ? (
                      <i>
                        "{bank}
                        {" in "}
                        {city}"
                      </i>
                    ) : (
                      <i>"{ifsc}"</i>
                    )}
                  </h1>
                  <span className="d-flex m-0">
                    <div style={{ width: "90%" }} className="underline"></div>
                    <span className=""></span>
                    <hr
                      style={{ width: "100%", height: "4px" }}
                      className="m-0"
                    ></hr>
                    <hr></hr>
                  </span>
                  <div className="invite">
                    <h3 className="">
                      If We Do Not Have Your Search Related Data,{" "}
                      <a href="https://github.com/shivamchourasia4/">
                        Do Let us Know!
                      </a>
                    </h3>
                    <div>
                      <img
                        src={notfound}
                        alt="Picutre"
                        style={{ height: "600px", width: "720px" }}
                        className="Picture"
                      ></img>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container pt-4 ">
                  <h1>
                    <i>"{noResuts}"</i> Search Results for{" "}
                    {bank ? (
                      <i>
                        "{bank}
                        {" in "}
                        {city}"
                      </i>
                    ) : (
                      <i>"{ifsc}"</i>
                    )}
                  </h1>
                  <span className="d-flex m-0">
                    <div style={{ width: "40%" }} className="underline"></div>
                    <span className=""></span>
                    <hr
                      style={{ width: "100%", height: "4px" }}
                      className="m-0"
                    ></hr>
                    <hr></hr>
                  </span>
                  <div className="container search-result-cover">
                    {results.map((each) => (
                      <ResultsCard detail={each} key={each._id} />
                    ))}
                    <button
                      className="butno my-2 noborder"
                      onClick={toTop}
                      style={{ alignSelf: "center" }}
                    >
                      Back To Top
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
