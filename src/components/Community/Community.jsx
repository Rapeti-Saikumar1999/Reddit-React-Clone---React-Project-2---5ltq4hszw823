import React, { useState } from "react";
import "./Styles/Community.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Community() {
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const HandleCreateCommunity = async (e) => {
    e.preventDefault();
    if (Title && Desc) {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "5ltq4hszw823",
          },
        };
        const formData = new FormData();
        formData.append("name", Title);
        formData.append("description", Desc);

        const response = await axios.post(
          "https://academics.newtonschool.co/api/v1/reddit/channel/",
          formData,
          config
        );

        setTitle("");
        setDesc("");
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter all fields");
    }
  };

  const HandleCancelCommunity = (e) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
    navigate("/");
  };
  return (
    <div className="community-container">
      <h3>Create Community</h3>
      <form action="">
        <input
          type="text"
          placeholder="Title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          cols="50"
          placeholder="Description"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        {/*  */}
        <div className="radio-btns">
          <div>
            <input
              type="radio"
              name="radio"
              id="public"
              defaultChecked
              style={{ cursor: "not-allowed" }}
            />
            <label htmlFor="public">
              <p>Public </p>
              <span>Anyone can view, post, and comment to this community</span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="radio"
              id="restricted"
              disabled
              style={{ cursor: "not-allowed" }}
            />
            <label htmlFor="restricted">
              <p>Restricted </p>
              <span>
                Anyone can view this community, but only approved users can post
              </span>
            </label>
          </div>{" "}
          <div>
            <input
              type="radio"
              name="radio"
              id="private"
              disabled
              style={{ cursor: "not-allowed" }}
            />
            <label htmlFor="private">
              <p>Private </p>
              <span>
                Only approved users can view and submit to this community
              </span>
            </label>
          </div>
        </div>
        <div className="adult-content" style={{ cursor: "not-allowed" }}>
          <h4>Adult content</h4>
          <div>
            <input type="checkbox" name="che" id="che" defaultChecked />
            <label htmlFor="che">
              <span>NSFW</span> 18+ year old community
            </label>
          </div>
        </div>
        {/*  */}
        <div className="create-community-buttons">
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={HandleCreateCommunity}
          >
            Create Community
          </button>
          <button
            style={{ border: "1px solid blue", color: "blue" }}
            onClick={(e) => HandleCancelCommunity(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Community;
