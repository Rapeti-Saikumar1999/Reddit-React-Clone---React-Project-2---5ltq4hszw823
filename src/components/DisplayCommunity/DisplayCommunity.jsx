import React from "react";
import "./Styles/DisplayCommunity.css";
import { useLocation } from "react-router";
function DisplayCommunity() {
  const location = useLocation();
  const state = location.state;
  //   console.log("state_is", state.id);
  //   console.log("state_is", state.name);
  return (
    <div className="displayCommunity-container">
      <div className="displayCommunity">div.</div>
    </div>
  );
}

export default DisplayCommunity;
