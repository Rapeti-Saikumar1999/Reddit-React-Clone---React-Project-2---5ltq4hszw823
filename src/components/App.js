import "../styles/App.css"
import NavBar from "./NavBar/NavBar";
import { Routes,Route } from "react-router";
import Home from "./Home/Home";
import { useState } from "react";
import Community from "./Community/Community";
import DisplayCommunity from "./DisplayCommunity/DisplayCommunity";
import CreatePost from "./CreatePost/CreatePost";
import CreateCommunityPost from "./CreateCommunityPost/CreateComminityPost";
import Premium from "./Premium/Premium";
function App() {

  return <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/community" element={<Community />}/>
      <Route path="/displayCommunity" element={<DisplayCommunity />}/>
      <Route path="/createPost" element={<CreatePost />}/>
      <Route path="/createCommunityPost" element={<CreateCommunityPost />}/>
      <Route path="/premium" element={<Premium />}/>
    </Routes>
  </div>;
}

export default App;
