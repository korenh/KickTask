import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../protected/Firebase";

export default class Register extends Component {
  handleRegister = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert("SignedUp");
        this.props.history.push("/");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleRegister}>
        <h1>KICKTASK</h1>
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
        <button className="btn-form">Register</button>
        <br />
        <Link to="/" className="link-style">
          Login
        </Link>
      </form>
    );
  }
}
