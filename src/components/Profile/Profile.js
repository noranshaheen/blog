import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import Post from "../Post/Post";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content'


export default function Profile() {
  console.log("aaaa")
  const user = JSON.parse(localStorage.getItem("user"));
  let localUserPosts = JSON.parse(localStorage.getItem("allUserPosts"));
  const [allPosts, setAllPost] = useState(localUserPosts);

  function handleDelete(post) {
    Swal.fire({
      title: `Are you sure to delete ${ post.title.substring(0,30) }... ?`,
      showCancelButton: true
    }).then((data) => {
      if (data.isConfirmed) {
        axios
      .delete(`https://dummyjson.com/posts/${post.id}`)
      .then((res) => {
        console.log(res.data);
        setAllPost(
          allPosts.filter((p) => {
            return p.id !== res.data.id;
          })
        );
        console.log(allPosts);
      })
      .catch((err) => {
        console.log(err);
      });
      }
    })
  }

  useEffect(() => {
    localStorage.setItem("allUserPosts", JSON.stringify(allPosts));
  }, [allPosts]);

  return (
    <>
      <Header />
      {user && (
        <div className="profile">
          <div className="container">
            <div className="avatar-background">
              <div className="avatar">
                <img src={user.image} alt="avatar" />
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
              </div>
            </div>
            <div className="navigate-btns">
              <button>
                <Link to="/post/add">Add Post</Link>
              </button>
              <button>
                <Link to="/likes">Likes</Link>
              </button>
            </div>
            <div className="post">
              {allPosts &&
                allPosts.map((post) => {
                  return (
                    <div className="post-body" key={post.id}>
                      <Post post={post} />
                      <div className="delete-btn">
                        <button
                          onClick={() => {
                            handleDelete(post);
                          }}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
