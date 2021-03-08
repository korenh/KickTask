import React ,  { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "./Firebase";

export default function Register(){

  const history = useHistory()
  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')

  const handleRegister = (e) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert("SignedUp");
        history.push("/")
      })
      .catch(function (error) {
        alert( error.message);
      });
  };

    return (
      <div className="login-form">
        <h1>KICKTASK</h1>
        <input type="text" className="input-form" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <br />
        <input type="text" className="input-form" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <br />
        <button className="btn-form" onClick={e=>handleRegister(e)}>Register</button>
        <br />
        <Link to="/" className="link-style">Login</Link>
      </div>
    );
  }

