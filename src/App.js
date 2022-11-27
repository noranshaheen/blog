import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Profile from "./components/Profile/Profile";
import AddPost from "./components/AddPost/AddPost";
import LikedPosts from "./components/LikedPosts/LikedPosts";

function App() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  function userInputHandler(e) {
    const name = e.target.value;
    setUsername(name);
  }
  function passInputHandler(e) {
    const p = e.target.value;
    setPass(p);
  }

  async function submitHandler(e) {
    e.preventDefault();
    axios
      .post("https://dummyjson.com/auth/login", {
        username: username,
        password: pass,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setSuccess(true);
          setPass("");
          setUsername("");
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("login", true);
        }
      })
      .catch((err) => {
        setErrMsg(err);
      });

    axios
      .get(`https://dummyjson.com/users/${ user.id }/posts`)
      .then((res) => {
      console.log(res.data.posts);
      localStorage.setItem("allUserPosts", JSON.stringify(res.data.posts));
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              submitHandler={submitHandler}
              username={username}
              pass={pass}
              errMsg={errMsg}
              success={success}
              userInputHandler={userInputHandler}
              passInputHandler={passInputHandler}
            />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/likes" element={<LikedPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
