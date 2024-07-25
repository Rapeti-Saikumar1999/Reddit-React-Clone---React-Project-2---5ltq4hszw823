import React, { useEffect, useRef, useState } from "react";
import "./Styles/DisplayCommunity.css";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RedditIcon from "@mui/icons-material/Reddit";
import { useLocation } from "react-router";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";
import { useNavigate } from "react-router";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
function DisplayCommunity() {
  let count = 0;
  const location = useLocation();
  const state = location.state;
  const Community_id = state.id;
  const Community_name = state.name;
  const CreateDate = state.CreatedAt;
  const [CommunityPosts, setCommunityPost] = useState([]);
  var createdAt = new Date(CreateDate);
  var Community_createDate = createdAt.toDateString();
  const [toggleFollow, setToggleFollow] = useState(true);
  const navigate = useNavigate();
  const fetchCommunityPosts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "5ltq4hszw823",
        },
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/channel/${Community_id}/posts`,
        config
      );
      setCommunityPost(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  return (
    <div className="displayCommunity-container">
      <div className="displayCommunityHeading">
        <RedditIcon
          style={{
            color: "orangered",
            fontSize: "70px",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
        <h2>{Community_name}</h2>
        <button
          className="follow_unfollow"
          onClick={() => setToggleFollow(!toggleFollow)}
        >
          {toggleFollow ? "Follow" : "Unfollow"}
        </button>
      </div>
      <div className="displayCommunity">
        <div className="displayCommunityPost">
          <div className="create-post-home" style={{ marginBottom: "20px" }}>
            <Face2RoundedIcon
              style={{ cursor: "not-allowed", fill: "darkgray" }}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Create Post"
              onClick={(e) => {
                e.preventDefault();

                navigate("/createCommunityPost", {
                  state: {
                    id: Community_id,
                    name: Community_name,
                    CreatedAt: CreateDate,
                  },
                });
              }}
            />
            <ImageIcon style={{ cursor: "not-allowed", fill: "darkgray" }} />
            <LocalOfferIcon
              style={{ cursor: "not-allowed", fill: "darkgray" }}
            />
          </div>
          <div className="posts-container">
            {CommunityPosts.length === 0 ? (
              <h2 style={{ textAlign: "center", margin: "20px 0px" }}>
                NO POSTS FOUND
              </h2>
            ) : (
              CommunityPosts.map((post) => {
                if (post !== null) {
                  var createdAt = new Date(post.createdAt);
                  var date = createdAt.toDateString();
                  var time = createdAt.toLocaleTimeString();
                  return (
                    <div className="each-post" key={post._id}>
                      <div className="post-header">
                        <p style={{ color: "black", fontWeight: "600" }}>
                          <RedditIcon style={{ marginRight: "5px" }} />{" "}
                          {post.author.name}
                          {name}
                        </p>
                        <p>{date}</p>
                        <p>{time}</p>
                      </div>
                      <div className="post-body">
                        <p className="post-content">{post.content}</p>
                        <img src={post.images} alt="" />
                      </div>
                      <div className="post-footer">
                        <p>
                          <div>
                            <ThumbUpIcon />
                            {post.likeCount > 0 ? post.likeCount : ""}
                          </div>
                          <div>
                            <ThumbDownIcon />
                            {post.dislikeCount > 0 ? post.dislikeCount : ""}
                          </div>
                        </p>
                        <p>
                          <InsertCommentIcon />
                          {post.commentCount > 0 ? post.commentCount : ""}
                        </p>
                        <p>
                          <ShareIcon />
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  count++;
                }
              })
            )}
            {CommunityPosts.length !== 0 && CommunityPosts.length === count ? (
              <h2 style={{ textAlign: "center", margin: "20px 0px" }}>
                NO POSTS FOUND
              </h2>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="displayAboutCommunity">
          <h4>About Community</h4>

          <p>
            <GroupIcon /> Created {Community_createDate}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/createCommunityPost", {
                state: {
                  id: Community_id,
                  name: Community_name,
                  CreatedAt: CreateDate,
                },
              });
            }}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayCommunity;
