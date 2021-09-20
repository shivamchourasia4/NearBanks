import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { RegisterContext } from "./ParentCover";

export default function Signin() {
  const history = useHistory();
  const registerContext = useContext(RegisterContext);

  const { message } = registerContext.regState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [red, setRed] = useState("darkgray");
  const [msg, setMsg] = useState(null);

  const tryLogin = async (e) => {
    e.preventDefault();
    const url = "/nearbanks/auth";

    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("usern", email);
        localStorage.setItem("tokenn", res.data.token);
        history.push("/");
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
          <h2>Sign in</h2>
          <hr />
          <p className="mapadd">{msg}</p>
          <p className="sucmsg">{message}</p>
          <form onSubmit={tryLogin}>
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
            <label>Password</label>
            <input
              className="forminput sign"
              style={{ border: `1px solid ${red}` }}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>
            <button className="butno butno-black mt-2" type="submit">
              Sign in
            </button>
            <div className="invite">
              <a href="/signup"> Don't have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
