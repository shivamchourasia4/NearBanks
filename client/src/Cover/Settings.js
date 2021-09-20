import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import userlogo from "../logos/user-circle-solid.svg";
export default function Settings() {
  const [userdata, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState("");
  const [password, setPassword] = useState("");
  const [red, setRed] = useState("darkgray");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const getName = () => {
      const url = `/nearbanks/auth/user/${localStorage.getItem("usern")}`;
      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("tokenn") },
        })
        .then((res) => {
          setuserData(res.data);

          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("tokenn");
          localStorage.removeItem("usern");
        });
    };

    if (localStorage.getItem("usern") != null) getName();

    return () => {
      setuserData(null);
      setLoading(true);
    };
  }, []);

  const ChangePassword = async (e) => {
    e.preventDefault();
    const url = "/nearbanks/auth/changepassword";
    axios
      .post(
        url,
        {
          email: localStorage.getItem("usern"),
          newPassword: password,
          password: curr,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("tokenn") },
        }
      )
      .then((res) => {
        setMsg(res.data.msg);
        setRed("#388e3c");
        setCurr("");
        setPassword("");
      })
      .catch((err) => {
        setRed("#e60023");
        setMsg(err.response.data.msg);
      });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="topbar container-fluid"></div>
          <div className="fullpage">
            <div className="container signer m-5 p-5 shadow">
              <a href="/" className="nounderline invite">
                <h1>NearBanks</h1>
              </a>
              <h2>Account Settings</h2>
              <hr />

              <div className="invite nounderline">
                <img
                  src={userlogo}
                  alt="user"
                  style={{ height: "100px", width: "100px" }}
                  className="pro-circle"
                ></img>
              </div>
              <h4 className="blue">Name</h4>
              <h3>
                {userdata.firstname} {userdata.lastname}
              </h3>
              <br></br>
              <h4 className="blue">Email</h4>
              <h3>{userdata.email}</h3>
              <br></br>
              <h4 className="blue"> Address</h4>
              <h3>{userdata.address}</h3>
              <br></br>
              <h4 className="blue">Change Password</h4>
              <p style={{ color: red }}>{msg}</p>

              <form onSubmit={ChangePassword} id="ipreset">
                <label>Current Password</label>
                <input
                  className="forminput sign"
                  style={{ border: `1px solid ${red}` }}
                  type="password"
                  value={curr}
                  onChange={(e) => {
                    setCurr(e.target.value);
                  }}
                  required
                ></input>
                <label>New Password</label>
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
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
