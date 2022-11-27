import React from "react";
import "./Header.css";
import { Link, Navigate } from "react-router-dom";

export default function Header() {

  function logout() {
    localStorage.removeItem("allUserPosts");
    // localStorage.removeItem("user");
    localStorage.removeItem("likes");
    localStorage.removeItem("login");
    window.location.reload();
  }

  return (
    <>
      {localStorage.getItem("login") ? (
        <div className="header">
          <div className="container">
            <div className="logo">Logo</div>
            <div className="nav-links">
              <Link to="/home">home</Link>
              <Link to="/profile">profile</Link>
              <button onClick={logout} className="logout">logout</button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
