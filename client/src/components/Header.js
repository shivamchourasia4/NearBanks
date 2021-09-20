import React from "react";
import { Link, useHistory } from "react-router-dom";
import ham from "../logos/bars-solid.svg";
import Ham from "./Ham";
import { useState } from "react";
import userlogo from "../logos/user-circle-solid.svg";

export default function Header() {
  const [showMenu, setMenu] = useState(false);

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("tokenn");
    localStorage.removeItem("usern");
    history.push("/signin");
  };
  return (
    <React.Fragment>
      <Ham setMenu={setMenu} showMenu={showMenu} logout={logout} />
      <div className="container-fluid topbar"></div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container-fluid container header-items">
          <img
            src={ham}
            alt="menu"
            id="menu"
            onClick={() => setMenu(!showMenu)}
          ></img>
          <a className="navbar-brand" href="/">
            <h1>
              <b>NearBanks</b>
            </h1>
          </a>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
              <li>
                <p className="nav-link active">
                  Search Banks near you, read reviews, choose your bank and
                  share your experience.
                </p>
              </li>
            </ul>
            {localStorage.getItem("usern") ? (
              <div className="m-1 d-flex logins">
                <button
                  className="butno"
                  type="submit"
                  onClick={logout}
                  id="hide-ham"
                >
                  Sign Out
                </button>
                <Link className="mx-4" id="hide-ham" to="/settings">
                  <img
                    src={userlogo}
                    alt="user"
                    style={{ height: "40px", width: "40px" }}
                    className="pro-circle"
                  ></img>
                </Link>
              </div>
            ) : (
              <div className="m-1 d-flex logins">
                <Link to="/signup" className="butno nounderline" id="hide-ham">
                  Sign up
                </Link>
                <Link
                  to="/signin"
                  className="butno mx-2 nounderline"
                  id="hide-ham"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
