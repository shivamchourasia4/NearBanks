import React, { useReducer } from "react";
import Header from "../components/Header";
import SearchGroup from "./SearchGroup";
import SearchResults from "../components/SearchResults";
import Leaflet from "../components/Leaflet";
import Signup from "./Signup";
import Signin from "./Signin";
import Reviews from "../components/Reviews";
import Welcome from "../components/Welcome";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Settings from "./Settings";

export const SearchContext = React.createContext();
export const LeafletContext = React.createContext();
export const RegisterContext = React.createContext();

const searchQuery = {
  bank: "",
  city: "",
  ifsc: "",
};

const forLeaflet = {
  add: "",
  region: "",
  cty: "",
};

const regSuccess = {
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "BANK":
      searchQuery.bank = action.payload.bank;
      searchQuery.city = action.payload.city;
      searchQuery.ifsc = "";
      return { ...state, bank: action.payload.bank, city: action.payload.city };
    case "IFSC":
      searchQuery.ifsc = action.value;
      searchQuery.bank = "";
      searchQuery.city = "";
      return { ...state, ifsc: action.value };
    default:
      return state;
  }
};

const reducerLeaflet = (state, action) => {
  switch (action.type) {
    case "SETLOCATION":
      forLeaflet.add = action.payload.add;
      forLeaflet.region = action.payload.region;
      forLeaflet.cty = action.payload.cty;
      return {
        add: action.payload.add,
        region: action.payload.region,
        cty: action.payload.cty,
      };
    default:
      return state;
  }
};

const reducerReg = (state, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return {
        message: action.value,
      };
    default:
      return state;
  }
};

export default function ParentCover() {
  const [search, dispatch] = useReducer(reducer, searchQuery);
  const [address, dispatchLeaflet] = useReducer(reducerLeaflet, forLeaflet);
  const [register, dispatchRegister] = useReducer(reducerReg, regSuccess);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <Welcome />
            <SearchContext.Provider
              value={{
                searchState: search,
                searchDispatch: dispatch,
                index: searchQuery,
              }}
            >
              <SearchGroup />
              <div id="rslt">
                <LeafletContext.Provider
                  value={{
                    lesfletState: address,
                    LeafletDispatcher: dispatchLeaflet,
                    altinfo: forLeaflet,
                  }}
                >
                  <SearchResults />
                </LeafletContext.Provider>
              </div>
            </SearchContext.Provider>
          </Route>
          <Route path="/map" exact>
            <Header />
            <Welcome />
            <LeafletContext.Provider
              value={{
                lesfletState: address,
                LeafletDispatcher: dispatchLeaflet,
                altinfo: forLeaflet,
              }}
            >
              <Leaflet />
            </LeafletContext.Provider>
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Route path="/review/:id" exact>
            <Header />
            <Welcome />
            <Reviews />
          </Route>
          <RegisterContext.Provider
            value={{
              regState: register,
              RegDispatcher: dispatchRegister,
            }}
          >
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/signin" exact>
              <Signin />
            </Route>
          </RegisterContext.Provider>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
