import React, { useState } from "react";
import "./Styles/Community.css";
import axios from "axios";
function Community() {
  const [Image, setImage] = useState(null);
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const HandleCreateCommunity = async (e) => {
    e.preventDefault();
    if (Image && Title && Desc) {
      console.log("1");
      try {
        const token = sessionStorage.getItem("token");
        console.log("2");
        let formData = new FormData();
        formData.append("title", Title);
        formData.append("description", Desc);
        formData.append("images", Image);

        const response = await axios.post(
          "https://academics.newtonschool.co/api/v1/reddit/channel/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: "5ltq4hszw823",
            },
          }
        );
        console.log("3");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter all fields");
    }
  };

  const HandleCancelCommunity = (e) => {
    e.preventDefault();
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
        <div className="fileInput">
          <label htmlFor="">Image</label>
          <input
            type="file"
            name="Image"
            id=""
            placeholder="Image"
            value={Image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="create-community-buttons">
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={HandleCreateCommunity}
          >
            Create Community
          </button>
          <button
            style={{ border: "1px solid blue", color: "blue" }}
            onSubmit={HandleCancelCommunity}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Community;
