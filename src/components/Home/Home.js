import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import axios from "axios";
import Post from "../Post/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("https://dummyjson.com/posts").then((res) => {
      // console.log(res.data);
      setPosts(res.data.posts);
    });

    axios.get("https://dummyjson.com/users?limit=50").then((res) => {
      // console.log(res.data);
      setAllUsers(res.data.users);
    });
  }, []);

  // console.log(user.firstName)
  return (
    <>
      <Header/>
      <div className="home">
        <div className="container">
          <div className="greeting">
            Hello, {user && user.firstName} {user && user.lastName}
          </div>
          {posts &&
            posts.map((post) => {
              return (
                <div>
                  {allusers &&
                    allusers.map((user) => {
                      return user.id === post.userId ? (
                        <div className="post" key={user.id}>
                          <div className="user-image">
                            <img src={user.image} alt="user" />
                          </div>
                          <div className="post-body">
                            <h3>
                              {user.firstName} {user.lastName}
                            </h3>
                            <Post key={post.id} post={post}/>
                          </div>
                        </div>
                      ) : null;
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
