import React, { useState } from "react";
import "./Styles/CreatePost.css";
import axios from "axios";
import { useNavigate } from "react-router";
function CreatePost() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (Title && Content && Image) {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "5ltq4hszw823",
          },
        };
        const formData = new FormData();
        formData.append("title", Title);
        formData.append("content", Content);
        formData.append("images", Image);

        const response = await axios.post(
          "https://academics.newtonschool.co/api/v1/reddit/post/",
          formData,
          config
        );

        setTitle("");
        setContent("");
        setImage("");
        alert("Created Post Successfully!");

        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter all fields");
    }
  };

  const handleCancelPost = () => {
    setTitle("");
    setContent("");
    setImage("");
    navigate("/");
  };

  return (
    <div className="createPost_container">
      <div className="createPost">
        <form action="">
          <h2>Create Post</h2>
          <input
            type="text"
            name=""
            id=""
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="40"
            rows="3"
            placeholder="Content"
            value={Content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="post_image_upload">
            <label htmlFor="">Image</label>
            <input type="file" name="" id="" onChange={handleImageChange} />
          </div>
          <div className="post_buttons">
            <button className="post_create_button" onClick={handleCreatePost}>
              Create Post
            </button>
            <button className="post__cancel_button" onClick={handleCancelPost}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
