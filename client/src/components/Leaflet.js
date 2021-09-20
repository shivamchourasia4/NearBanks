import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LeafletContext } from "../Cover/ParentCover";
import notfound from "../logos/Lantern-pana.svg";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../Cover/Loader.js";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Leaflet() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loading, setLoading] = useState(true);

  const leafletContext = useContext(LeafletContext);
  const history = useHistory();

  const { add, region, cty } = leafletContext.altinfo;

  useEffect(() => {
    const waiter = async () => {
      window.scrollTo({
        top: 0,
      });

      axios
        .get(
          `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_MAP_API_KEY}&query=${add}&country=IN&region=${region}`
        )
        .then((res) => {
          const op = res;

          const ip = op.data;

          const arr = ip.data;

          if (arr.length === 0) {
            setLat("");
            setLong("");
          } else {
            const first = arr[0];

            setLat(first.latitude);
            setLong(first.longitude);
          }

          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    if (add.length === 0) {
      history.push("/");
    } else {
      waiter();
    }
    return () => {};
  }, [add, region, history]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {lat ? (
            <div className="card">
              <div className="m-5 leaflet-cover">
                <div>
                  <h3>There You Go!</h3>{" "}
                  <h3>
                    <i>THIS MAP SHOWS THE APPROXIMATE LOCATION OF THE BANK.</i>
                    <br />
                    <small className="mapadd">
                      {add} {cty}
                    </small>
                  </h3>
                  <span className="d-flex m-0">
                    <div style={{ width: "40%" }} className="underline"></div>
                    <span className=""></span>
                    <hr
                      style={{ width: "100%", height: "4px" }}
                      className="m-0"
                    ></hr>
                    <hr></hr>
                  </span>
                </div>
                <div id="mapid">
                  <MapContainer
                    center={[lat, long]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, long]}>
                      <Popup>
                        BANK'S LOCATION. <br /> IT MAY BE SOMEWHERE AROUND HERE!
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <span>
                  <small>
                    If The Map Doesn't Shows The Proper Location,{" "}
                    <a href={`https://maps.google.com/maps?q=+${add}+${cty}`}>
                      {" "}
                      Here's The Google Map Link We Found!
                    </a>
                  </small>
                </span>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="m-5 leaflet-cover">
                <div>
                  <h3>
                    Sorry, We Are Unable To Locate This Bank's Location.
                    <br />
                    <small className="mapadd">
                      {add} {cty}
                    </small>
                  </h3>{" "}
                  <span className="d-flex m-0">
                    <div style={{ width: "40%" }} className="underline"></div>
                    <span className=""></span>
                    <hr
                      style={{ width: "100%", height: "4px" }}
                      className="m-0"
                    ></hr>
                    <hr></hr>
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <a href={`https://maps.google.com/maps?q=+${add}+${cty}`}>
                    Here's The Location We Found On Google.
                  </a>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
