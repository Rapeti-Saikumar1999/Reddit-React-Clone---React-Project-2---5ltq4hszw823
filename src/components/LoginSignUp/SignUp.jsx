import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../Auth/AuthContextProvider";
import axios from "axios";
import "./SignUp.css";
const SignUp = ({ close, openLogin }) => {
  const { setModalOpen, setIsLoggedIn } = useAuth();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pwd, setPwd] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRef = (e) => {
    if (modelRef.current === e.target) {
      close();
    }
  };

  const modelRef = useRef();

  const handleSignUp = async () => {
    try {
      const config = {
        headers: {
          ContentType: "application/json",
          projectID: "5ltq4hszw823",
        },
      };
      const body = {
        name: Name,
        email: Email,
        password: Pwd,
        appType: "reddit",
      };
      const response = await axios.post(
        `https://academics.newtonschool.co/api/v1/user/signup`,
        body,
        config
      );
      const token = response.data.token;
      // console.log(response.data.data.user._id);
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", response.data.data.user._id);
        setIsLoggedIn(true);
        openLogin();
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
          height: "400px",
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
        <form action="" onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "20px" }}>Sign Up</h2>
          <input
            type="text"
            name=""
            id=""
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Password"
            value={Pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            type="submit"
            style={{ marginBottom: "20px" }}
            onClick={handleSignUp}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
