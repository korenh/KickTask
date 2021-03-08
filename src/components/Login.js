import React, { useState } from "react";
import { Link , useHistory } from "react-router-dom";
import firebase from "./Firebase";
import Auth from "./Auth";

export default function Login(){

  const history = useHistory()
  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')

  const handleLogin = (e) => { 
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        sessionStorage.setItem("id", email);
        Auth.login(() => {history.push("/main")})
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

    return (
      <div className="login-form">
        <h1>KICKTASK</h1>
        <input type="text" className="input-form" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <br />
        <input type="text" className="input-form" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <br />
        <button className="btn-form" onClick={e=>handleLogin(e)}>LOGIN</button>
        <br />
        <Link to="/register" className="link-style">Register</Link>
      </div>
    );
  }

