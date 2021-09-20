import React from "react";
import heart from "../logos/suit-heart-fill.svg";
import react from "../logos/react.svg";
import nodejs from "../logos/nodejs.svg";
import mongodb from "../logos/mongodb.svg";
import express from "../logos/express.svg";
import github from "../logos/github.svg";
import instagram from "../logos/instagram.svg";
import linkedin from "../logos/linkedin.svg";

export default function Footer() {
  return (
    <div className="footer container-fluid p-3">
      <div className="container footer-cover m-3">
        <div className="footer-items-cover">
          {localStorage.getItem("usern") ? null : (
            <div className="footer-items invite">
              <a className="m-1 nounderline" href="/">
                <h5>Home</h5>
              </a>
              <a className="m-1 nounderline" href="/signup">
                <h5>Sign up</h5>
              </a>
              <a className="m-1 nounderline" href="/signin">
                <h5>Sign in</h5>
              </a>
            </div>
          )}
          <div className="footer-items">
            <span>
              <p className="m-0">
                Made With Love. <img src={heart} alt="heart"></img>
              </p>
            </span>
            {"&"}
            <span>
              <p>
                <img src={mongodb} alt="mongodb" className="tech"></img>
                <img src={express} alt="express" className="tech"></img>
                <img src={react} alt="react" className="tech"></img>
                <img src={nodejs} alt="node" className="tech"></img>
              </p>
            </span>
          </div>
          <div className="footer-items">
            <span>
              <p className="m-0">Developer: Shivam Chourasia</p>
            </span>
            <p>
              <a href="https://github.com/shivamchourasia4/">
                <img src={github} alt="mongodb" className="tech"></img>
              </a>
              <a href="https://www.linkedin.com/in/shivamchourasia">
                <img src={linkedin} alt="linkedin" className="tech"></img>
              </a>
              <a href="https://www.instagram.com/_shivamchourasia/">
                <img src={instagram} alt="instagram" className="tech"></img>
              </a>
            </p>
          </div>
        </div>
      </div>
      <p>
        Disclaimer: We do not promote or validate the data shown or published on
        this website.
      </p>
      <p>&copy; 2021</p>
    </div>
  );
}
