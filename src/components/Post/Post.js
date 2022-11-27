import React, { useEffect, useState } from "react";
import "./Post.css";

//const likedPosts = [];

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const localLikedPosts = JSON.parse(localStorage.getItem("likes"));
    if (localLikedPosts) {
      let isExist = localLikedPosts.filter((p) => {
        return p.id === post.id;
      });
      // console.log(isExist)
      if (isExist.length > 0) {
        setLiked(true);
      }
    }
  });

  function hundleLikes(post) {
    if (!localStorage.getItem("likes")) {
      localStorage.setItem("likes", JSON.stringify([post]));
    } else {
      const likedPosts = JSON.parse(localStorage.getItem("likes"));
      likedPosts.push(post);
      localStorage.setItem("likes", JSON.stringify(likedPosts));
    }
    setLiked(true);
  }

  function hundleDislikes(post) {
    setLiked(false);
    const likedPosts = JSON.parse(localStorage.getItem("likes"));
    let arrOfLikedPosts = likedPosts.filter((p) => {
      return p.id !== post.id;
    })
    // console.log(arrOfLikedPosts);
    localStorage.setItem("likes", JSON.stringify(arrOfLikedPosts));
  }

  return (
    <div className="content">
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      {post.tags.map((tag) => {
        return <span className="tag">#{tag} </span>;
      })}
      <div className="reaction">
        <button
          className={liked ? "disable" : null}
          onClick={() => {
            hundleLikes(post);
          }}
        >
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button
          className={liked ? "liked" : "disable"}
          onClick={() => {
            hundleDislikes(post);
          }}
        >
          <i class="fa-solid fa-thumbs-up"></i>
        </button>
      </div>
    </div>
  );
}
