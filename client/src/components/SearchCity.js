import React, { useContext, useState } from "react";
import cclogo from "../logos/Questions-pana.svg";
import { SearchContext } from "../Cover/ParentCover";
// import cclogo from "../logos/Credit card-bro.svg";

export default function SearchCover() {
  const [bankName, setBankName] = useState("");
  const [cityName, setCityName] = useState("");
  const [red, setRed] = useState("darkgray");
  const [EntrBnk, SetEntrBnk] = useState(false);
  // const [showSug, setSug] = useState(false);

  const searchContext = useContext(SearchContext);

  const bankChange = (e) => {
    setBankName(e.target.value);
  };
  const cityChange = (e) => {
    setCityName(e.target.value);
  };

  const search = () => {
    if (cityName.length > 0 && bankName.length > 0) {
      searchContext.searchDispatch({
        type: "BANK",
        payload: { bank: bankName, city: cityName },
      });

      setBankName("");
      setCityName("");
      setRed("darkgray");
      SetEntrBnk(false);
    } else {
      setRed("red");
      SetEntrBnk(true);
    }
  };

  return (
    <div className="searcholder">
      <div className="m-3 formstuff">
        <input
          className="forminput sug"
          type="search"
          style={{ border: `1px solid ${red}` }}
          placeholder={EntrBnk ? "Enter Bank Name!" : "Full Bank Name"}
          value={bankName}
          onChange={(e) => bankChange(e)}
        ></input>
        {/* {showSug ? <div className="srcsug"></div> : null} */}
        <input
          className="forminput"
          type="search"
          style={{ border: `1px solid ${red}` }}
          placeholder={EntrBnk ? "Enter City Name!" : "City Name"}
          value={cityName}
          onChange={(e) => cityChange(e)}
        ></input>
        <span className="m-2 p-3">
          <button className="butno butno-black m-0" onClick={search}>
            Search
          </button>
        </span>
      </div>
      <img
        src={cclogo}
        alt="Picutre"
        style={{ height: "400px", width: "520px" }}
        className="Picture"
      ></img>
    </div>
  );
}
