import React, { useEffect, useState } from "react";
import "./LikedPosts.css";
import Header from "../Header/Header";
import Post from "../Post/Post";
import axios from "axios";

export default function LikedPosts() {
  const likes = JSON.parse(localStorage.getItem("likes"));
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/users?limit=50").then((res) => {
      setAllUsers(res.data.users);
    });
  });

  return (
    <div className="likes">
      <Header />
      <div className="container">
        <div className="tilte">Liked Posts</div>
        {likes &&
          likes.map((post) => {
            return (
              <div className="post">
                {allusers &&
                  allusers.map((user) => {
                    return user.id === post.userId ? (
                      <>
                        <div className="user-image">
                          <img src={user.image} alt="user" />
                        </div>
                        <div className="post-body">
                          <h3>
                            {user.firstName} {user.lastName}
                          </h3>
                          <Post post={post} />;
                        </div>
                      </>
                    ) : null;
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
