import React from "react";
import "./NavBar.css";
import { Routes, Route } from "react-router";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { useAuth } from "../../Auth/AuthContextProvider";
import { useNavigate } from "react-router";
import VideocamIcon from "@mui/icons-material/Videocam";
import NotificationsIcon from "@mui/icons-material/Notifications";
function NavBar() {
  const {
    setSearchValue,
    setModalOpen,
    modalOpen,
    isLoggedIn,
    setIsLoggedIn,
    setUserId,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <div className="NavBar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="" style={{ height: "50px", width: "50px" }} />
          <span>reddit</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Reddit by name....(ex:Tracey Mraz)"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="left-nav">
          <div className="chat-icon" style={{ cursor: "not-allowed" }}>
            <TextsmsOutlinedIcon />
            <VideocamIcon />
            <NotificationsIcon />
          </div>
          <div className="create-post">
            <NavLink
              to="/createPost"
              style={{ textDecoration: "none", color: "unset" }}
            >
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
                  setUserId("");
                  navigate("/");
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
