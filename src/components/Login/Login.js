import React from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";

export default function Login({
  errMsg,
  submitHandler,
  username,
  pass,
  userInputHandler,
  passInputHandler,
}) {
  return (
    <>
      {localStorage.getItem("login") ? (
              <Navigate to="/home" />
      ) :
      <div className="login">
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <label id="username-lable">username</label>
        <input
          type="text"
          autoComplete="off"
          onChange={userInputHandler}
          value={username}
          id="username"
        />
        <label id="pass-label">password</label>
        <input
          type="password"
          autoComplete="off"
          onChange={passInputHandler}
          value={pass}
          id="pass"
        />
        <button>Submit</button>
      </form>
      <p>{errMsg}</p>
    </div> }
      
    </>
  );
}
