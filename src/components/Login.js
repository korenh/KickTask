import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./Firebase";

export default class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        window.location.replace("/main");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleLogin}>
        <h1>KICKTASK</h1>
        <br />
        <input
          type="text"
          className="input-form"
          placeholder="email"
          name="email"
        />
        <br />
        <input
          type="text"
          className="input-form"
          placeholder="Password"
          name="password"
        />
        <br />
        <button className="btn-form">LOGIN</button>
      </form>
    );
  }
}
