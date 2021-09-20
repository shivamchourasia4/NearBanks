import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { RegisterContext } from "../Cover/ParentCover";

export default function Signup() {
  const [firstname, setfName] = useState("");
  const [lastname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [add, setAdd] = useState("");
  const [msg, setMsg] = useState(null);
  const [red, setRed] = useState("darkgray");

  const history = useHistory();
  const regContext = useContext(RegisterContext);

  const tryReg = async (e) => {
    e.preventDefault();
    const url = "/nearbanks/register";

    axios
      .post(url, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: add,
      })
      .then(() => {
        regContext.RegDispatcher({
          type: "SET_SUCCESS",
          value: "Sign Up Success",
        });
        history.push("/signin");
      })
      .catch((err) => {
        setRed("#e60023");
        setMsg(err.response.data.msg);
      });
  };

  return (
    <React.Fragment>
      <div className="topbar container-fluid"></div>
      <div className="fullpage">
        <div className="container signer m-5 p-5 shadow">
          <a href="/" className="nounderline invite">
            <h1>NearBanks</h1>
          </a>
          <h2>Sign up</h2>
          <hr />
          <p className="mapadd">{msg}</p>
          <form onSubmit={tryReg}>
            <label>First Name</label>
            <input
              className="forminput sign"
              type="text"
              value={firstname}
              onChange={(e) => {
                setfName(e.target.value);
              }}
              required
            ></input>
            <label>Last Name</label>
            <input
              className="forminput sign"
              type="text"
              value={lastname}
              onChange={(e) => {
                setlName(e.target.value);
              }}
              required
            ></input>
            <label>Email</label>
            <input
              className="forminput sign"
              style={{ border: `1px solid ${red}` }}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>
            <label>Address</label>
            <input
              className="forminput sign"
              type="text"
              value={add}
              onChange={(e) => {
                setAdd(e.target.value);
              }}
              required
            ></input>
            <label>Password</label>
            <input
              className="forminput sign"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>
            <button className="butno butno-black mt-2" type="submit">
              Sign up
            </button>
            <div className="invite">
              <a href="/signin"> Already have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
