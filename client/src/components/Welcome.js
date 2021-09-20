import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Cover/Loader";
import Invite from "./Invite";

export default function Welcome() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getName = () => {
      const url = `/nearbanks/auth/user/${localStorage.getItem("usern")}`;
      axios
        .get(url, {
          headers: { "x-auth-token": localStorage.getItem("tokenn") },
        })
        .then((res) => {
          setName(res.data.firstname);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("tokenn");
          localStorage.removeItem("usern");
        });
    };

    if (localStorage.getItem("usern") != null) getName();

    return () => {
      setName(null);
      setLoading(true);
    };
  }, []);

  return (
    <React.Fragment>
      {name ? (
        <React.Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid gray">
              <div className="invite">
                <h1>Welcome {name}!</h1>
                {/* <br />*/}
                <h6>
                  Share Your Bank Experience And Help Others In Choosing The
                  Right Bank For Them.{" "}
                </h6>
              </div>
            </div>
          )}
        </React.Fragment>
      ) : (
        <Invite />
      )}
    </React.Fragment>
  );
}
