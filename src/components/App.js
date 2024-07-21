import "../styles/App.css"
import NavBar from "./NavBar/NavBar";
import { Routes,Route } from "react-router";
import Home from "./Home/Home";
import { useState } from "react";
import Community from "./Community/Community";
function App() {

  return <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/community" element={<Community />}/>
    </Routes>
  </div>;
}

export default App;
