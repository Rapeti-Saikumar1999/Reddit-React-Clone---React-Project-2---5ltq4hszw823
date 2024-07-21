import React from "react";
import "./NavBar.css";
import { Routes, Route } from "react-router";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import ControlledSwitches from "../Toggle/Toggle";
import chatIcon from "../../assets/chat-icon.png";
import { useAuth } from "../../Auth/AuthContextProvider";
function NavBar() {
  const { setSearchValue, setModalOpen, modalOpen, isLoggedIn, setIsLoggedIn } =
    useAuth();
  console.log(isLoggedIn);
  return (
    <div className="nav-container">
      <div className="NavBar">
        <div className="logo">
          <img src={Logo} alt="" style={{ height: "50px", width: "50px" }} />
          <span>reddit</span>
        </div>
        <div className="navbar-dropdown">
          <NavLink to="" style={{ textDecoration: "unset", color: "black" }}>
            Home
          </NavLink>
          <NavLink to="" style={{ textDecoration: "unset", color: "black" }}>
            Popular
          </NavLink>
        </div>
        <div className="search-bar">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Reddit"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="left-nav">
          <div className="chat-icon" style={{ cursor: "not-allowed" }}>
            <img
              src={chatIcon}
              alt=""
              style={{ height: "25px", width: "25px" }}
            />
          </div>
          <div className="create-post">
            <NavLink to="" style={{ textDecoration: "none", color: "unset" }}>
              <p>
                <span>+ </span>Create
              </p>
            </NavLink>
          </div>
          <div className="login-logout">
            {isLoggedIn ? (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => {
                  setIsLoggedIn(!isLoggedIn);
                  sessionStorage.clear();
                }}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => setModalOpen(!modalOpen)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default NavBar;
