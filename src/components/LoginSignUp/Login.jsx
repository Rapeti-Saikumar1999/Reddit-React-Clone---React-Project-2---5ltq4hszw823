// src/LoginForm.js
import React, { useRef, useState } from "react";
import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../Auth/AuthContextProvider";
import axios from "axios";
const Login = ({ close, openSignUp }) => {
  const [Email, setEmail] = useState("");
  const [Pwd, setPwd] = useState("");
  const { setModalOpen, isLoggedIn, setIsLoggedIn, setUserId } = useAuth();

  const handleRef = (e) => {
    if (modelRef.current === e.target) {
      close();
    }
  };

  const modelRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          ContentType: "application/json",
          projectID: "5ltq4hszw823",
        },
      };
      const body = {
        email: Email,
        password: Pwd,
        appType: "reddit",
      };
      const response = await axios.post(
        `https://academics.newtonschool.co/api/v1/user/login`,
        body,
        config
      );
      const token = response.data.token;
      const userid = response.data.data.user._id;
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userid);
        close();
        setIsLoggedIn(true);
        setUserId(userid);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className="Login" ref={modelRef} onClick={handleRef}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px 3px black",
        }}
      >
        <CloseIcon
          style={{
            fontSize: "32px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={close}
        />
        <form action="" onSubmit={handleLogin}>
          <h2 style={{ fontSize: "20px" }}>Login</h2>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            value={Pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          Don't have an acoount ?
          <span
            style={{ color: "blue", marginLeft: "10px", cursor: "pointer" }}
            onClick={openSignUp}
          >
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
