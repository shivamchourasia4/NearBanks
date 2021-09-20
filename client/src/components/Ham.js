import React from "react";
import { Link } from "react-router-dom";
import close from "../logos/times-solid.svg";
import userlogo from "../logos/user-circle-solid.svg";
// import userlogo from "../logos/test.jpeg";
import github from "../logos/github.svg";
import instagram from "../logos/instagram.svg";
import linkedin from "../logos/linkedin.svg";

export default function Ham(props) {
  const signout = () => {
    props.logout();
  };

  return (
    <div>
      <div className={props.showMenu ? "ham active" : "ham"}>
        <img
          src={close}
          alt="menu"
          id="menu"
          onClick={() => props.setMenu(!props.showMenu)}
        ></img>
        <h1>
          <b>NearBanks</b>
        </h1>
        <hr style={{ border: "1px solid black", width: "100%" }}></hr>
        <div className="ham-items">
          {localStorage.getItem("usern") ? (
            <div>
              <a href="/settings">
                <div className="invite nounderline">
                  <img
                    src={userlogo}
                    alt="user"
                    style={{ height: "60px", width: "60px" }}
                    className="pro-circle"
                  ></img>
                </div>
              </a>
              <h4 className="invite py-0 mapadd">
                {localStorage.getItem("usern")}
              </h4>
              <Link className="invite nounderline pt-0" to="/settings">
                <h3>Account Settings</h3>
              </Link>

              <a
                className="invite nounderline pt-0"
                href="https://github.com/shivamchourasia4/"
              >
                <h3>Give FeedBack</h3>
              </a>

              <span className="invite" type="submit" onClick={signout}>
                <h3>Sign Out</h3>
              </span>
            </div>
          ) : (
            <div>
              <Link to="/signup" className="invite nounderline">
                <h3>Sign up</h3>
              </Link>
              <Link to="/signin" className="invite nounderline pt-0">
                <h3>Sign in</h3>
              </Link>
            </div>
          )}
          <div className="footer-items">
            <p>Contact Us</p>
            <p>
              <a href="https://github.com/shivamchourasia4/">
                <img src={github} alt="mongodb" className="ham-tech"></img>
              </a>
              <a href="https://www.linkedin.com/in/shivamchourasia">
                <img src={linkedin} alt="linkedin" className="ham-tech"></img>
              </a>
              <a href="https://www.instagram.com/_shivamchourasia/">
                <img src={instagram} alt="instagram" className="ham-tech"></img>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
