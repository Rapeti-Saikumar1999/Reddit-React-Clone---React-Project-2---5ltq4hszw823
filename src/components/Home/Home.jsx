import React, { useEffect, useState } from "react";
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
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [myCommunities, setMyCommunities] = useState([]);
  const [Best, setBest] = useState(false);
  const [Hot, setHot] = useState(false);
  const [New, setNew] = useState(false);
  const [Top, setTop] = useState(false);
  const {
    searchValue,
    modalOpen,
    setModalOpen,
    SignUpModalOpen,
    setSignUpModalOpen,
    isLoggedIn,
    userId,
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

    function getYear(dateString) {
      const dateObject = new Date(dateString);
      return dateObject.getFullYear();
    }

    // Sort data by year
    const popular_communities = response.data.data;
    popular_communities.sort(
      (a, b) => getYear(a.createdAt) - getYear(b.createdAt)
    );

    setCommunities(popular_communities);
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
  }, [userId]);

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
              const id = e._id;
              const CreatedAt = e.createdAt;
              const name = e.name;
              return (
                <p
                  className="myEachCommunity"
                  onClick={(e) => {
                    e.preventDefault();

                    navigate("/displayCommunity", {
                      state: { id, name, CreatedAt },
                    });
                  }}
                >
                  {" "}
                  <Face2RoundedIcon
                    style={{ fill: "orangered", margin: "10px 10px 10px 10px" }}
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
              style={{ cursor: "not-allowed", fill: "orangered" }}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Create Post"
              onClick={() => navigate("/createPost")}
            />
            <ImageIcon style={{ cursor: "not-allowed", fill: "darkgray" }} />
            <LocalOfferIcon
              style={{ cursor: "not-allowed", fill: "darkgray" }}
            />
          </div>
          <div className="best-filters ">
            <p onClick={() => setBest(!Best)}>
              <RocketRoundedIcon style={{ fill: "blue" }} />
              Best
            </p>
            <p onClick={() => setHot(!Hot)}>
              <WhatshotRoundedIcon style={{ fill: "orangered" }} />
              Hot
            </p>
            <p onClick={() => setNew(!New)}>
              <Brightness5RoundedIcon style={{ fill: "orange" }} />
              New
            </p>
            <p onClick={() => setTop(!Top)}>
              <NorthIcon style={{ fill: "red" }} />
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
            })}
          </div>
        </div>
      </div>
      <div className="left-home-container">
        <div className="popular-communities">
          <div className="popular-communities-heading">
            <h2>Popular Communities </h2>
          </div>
          {communities.map((community) => {
            // console.log(community);
            const id = community._id;
            const name = community.name;
            const CreatedAt = community.createdAt;
            return (
              <div
                className="community"
                onClick={() => {
                  navigate("/displayCommunity", {
                    state: { id, name, CreatedAt },
                  });
                }}
              >
                {community.image ? (
                  <img src={community.image} alt="" width={50} />
                ) : (
                  <Face2RoundedIcon
                    style={{
                      fill: "orangered",
                      margin: "10px 10px 10px 10px",
                    }}
                  />
                )}
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {community.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="Premium_container">
          <div className="premium">
            <div className="premium_icon">
              <WorkspacePremiumOutlinedIcon
                style={{ fill: "orangered", fontSize: "50px" }}
              />
            </div>
            <div className="premiumBody">
              <h4>Reddit Premium</h4>
              <p>The best Reddit experience, with monthly Coins</p>
            </div>
          </div>
          <button
            className="premium_TryOut"
            onClick={(e) => {
              e.preventDefault();
              navigate("/premium");
            }}
          >
            Try Now !
          </button>
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
