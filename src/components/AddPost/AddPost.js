import axios from "axios";
import React, { useState } from "react";
import Header from "../Header/Header";
import "./AddPost.css";

export default function AddPost() {
  const [title, setTiltle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userPosts = JSON.parse(localStorage.getItem("allUserPosts"));

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("https://dummyjson.com/posts/add", {
        title: title,
        body: body,
        tags: tags.split(" "),
        userId: user.id,
      })
      .then((res) => {
        console.log(res.data);
        userPosts.push(res.data);
        console.log(userPosts);
        localStorage.setItem("allUserPosts", JSON.stringify(userPosts));

        window.history.back();
      });
  }

  return (
    <>
      <Header />
      <div className="add-post">
        <form onSubmit={submitHandler}>
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => {
              setTiltle(e.target.value);
            }}
            value={title}
          />
          <label>Body</label>
          <textarea
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
            rows="6"
          />
          <label>Tags</label>
          <input
            type="text"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            value={tags}
            rows={5}
          />
          <button>Post</button>
        </form>
      </div>
    </>
  );
}
