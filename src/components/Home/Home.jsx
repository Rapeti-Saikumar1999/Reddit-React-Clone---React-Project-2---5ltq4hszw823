import React, { useEffect, useId, useState } from "react";
import "./Styles/Home.css";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import RocketRoundedIcon from "@mui/icons-material/RocketRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import Brightness5RoundedIcon from "@mui/icons-material/Brightness5Rounded";
import NorthIcon from "@mui/icons-material/North";
import RedditIcon from "@mui/icons-material/Reddit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContextProvider";
import Login from "../LoginSignUp/Login";
import SignUp from "../LoginSignUp/SignUp";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [myCommunities, setMyCommunities] = useState([]);
  const {
    searchValue,
    modalOpen,
    setModalOpen,
    SignUpModalOpen,
    setSignUpModalOpen,
    isLoggedIn,
  } = useAuth();

  const [communities, setCommunities] = useState([]);
  const [Posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const config = {
      headers: {
        projectID: "5ltq4hszw823",
      },
    };

    const response = await axios.get(
      "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
      config
    );
    setPosts(response.data.data);
  };

  const fetchCommunities = async () => {
    const config = {
      headers: {
        projectID: "5ltq4hszw823",
      },
    };
    const response = await axios.get(
      "https://academics.newtonschool.co/api/v1/reddit/channel?limit=100",
      config
    );

    setCommunities(response.data.data);
  };

  const filterSearch = async () => {
    try {
      const config = {
        headers: {
          projectID: "5ltq4hszw823",
        },
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/post?filter={"author.name":"${searchValue}"}`,
        config
      );

      setPosts(response.data.data);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const fetchMyCommunities = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      console.log("userid :" + userId);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "5ltq4hszw823",
        },
      };

      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/reddit/channel/",
        config
      );
      console.log(response.data.data[0].owner._id);
      const myCommunitiesList = response.data.data.filter((e) => {
        return e.owner._id === userId;
      });
      setMyCommunities(myCommunitiesList);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCommunities();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      fetchPosts();
    } else {
      filterSearch();
    }
  }, [searchValue]);

  useEffect(() => {
    fetchMyCommunities();
  }, []);

  return (
    <div className="Home-container">
      <div className="side-bar">
        <div className="side-bar-community">
          <h4>My Communities</h4>
          <p
            className="addCommunity"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/community");
              } else {
                setModalOpen(!modalOpen);
              }
            }}
          >
            <AddIcon /> Create Community
          </p>
          <div className="myCommunities">
            {myCommunities.map((e) => {
              return (
                <p className="myEachCommunity">
                  {" "}
                  <Face2RoundedIcon
                    style={{ fill: "blue", margin: "10px 10px 10px 10px" }}
                  />
                  {e.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="right-home-container">
        <div className="right-home">
          <div className="create-post-home">
            <Face2RoundedIcon
              style={{ cursor: "not-allowed", fill: "darkgray" }}
            />
            <input type="text" name="" id="" placeholder="Create Post" />
            <ImageIcon style={{ cursor: "not-allowed", fill: "darkgray" }} />
            <LocalOfferIcon
              style={{ cursor: "not-allowed", fill: "darkgray" }}
            />
          </div>
          <div className="best-filters ">
            <p>
              <RocketRoundedIcon />
              Best
            </p>
            <p>
              <WhatshotRoundedIcon />
              Hot
            </p>
            <p>
              <Brightness5RoundedIcon />
              New
            </p>
            <p>
              <NorthIcon />
              Top
            </p>
          </div>
          <div className="posts-container">
            {Posts.map((post) => {
              var createdAt = new Date(post.createdAt);
              var date = createdAt.toDateString();
              var time = createdAt.toLocaleTimeString();
              return (
                <div className="each-post" key={post._id}>
                  <div className="post-header">
                    <p style={{ color: "black", fontWeight: "600" }}>
                      <RedditIcon style={{ marginRight: "5px" }} />{" "}
                      {post.author.name}
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
            })}
          </div>
        </div>
      </div>
      <div className="left-home-container">
        <div className="popular-communities">
          <h2 className="popular-communities-heading">Popular Communities </h2>
          {communities.map((community) => {
            return (
              <div className="community">
                {community.image ? (
                  <img src={community.image} alt="" width={50} />
                ) : (
                  <Face2RoundedIcon
                    style={{ fill: "orangered", margin: "10px 10px 10px 10px" }}
                  />
                )}
                <span>{community.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {modalOpen && (
        <Login
          close={() => setModalOpen(!modalOpen)}
          openSignUp={() => {
            setSignUpModalOpen(!SignUpModalOpen);
            setModalOpen(!modalOpen);
          }}
        />
      )}
      {SignUpModalOpen && (
        <SignUp
          close={() => setSignUpModalOpen(!SignUpModalOpen)}
          openLogin={() => {
            setSignUpModalOpen(!SignUpModalOpen);
            setModalOpen(!modalOpen);
          }}
        />
      )}
    </div>
  );
}

export default Home;
