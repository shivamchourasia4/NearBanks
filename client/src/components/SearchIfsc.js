import React, { useContext, useState } from "react";
import { SearchContext } from "../Cover/ParentCover";
import charlogo from "../logos/Credit card-rafiki.svg";

function SearchIfsc() {
  const [ifsc, setIfsc] = useState("");
  const [red, setRed] = useState("darkgray");
  const [EntrBnk, SetEntrBnk] = useState(false);

  const searchContext = useContext(SearchContext);

  const ifscChange = (e) => {
    setIfsc(e.target.value);
  };

  const search = () => {
    if (ifsc.length > 0) {
      searchContext.searchDispatch({ type: "IFSC", value: ifsc });
      setIfsc("");
      setRed("darkgray");
      SetEntrBnk(false);
    } else {
      // setRed("#ff1744");
      setRed("red");
      SetEntrBnk(true);
    }
  };

  return (
    <div>
      <div className="searcholder">
        <img
          src={charlogo}
          alt="Picutre"
          style={{ height: "400px", width: "520px" }}
          className="Picture"
        ></img>
        <div className="m-3 formstuff">
          <input
            className="forminput"
            type="search"
            style={{ border: `1px solid ${red}` }}
            placeholder={EntrBnk ? "Enter IFSC Code!" : "IFSC Code"}
            value={ifsc}
            onChange={(e) => ifscChange(e)}
          ></input>
          <span className="p-3">
            <button className="butno butno-black m-0" onClick={search}>
              Search
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchIfsc;
