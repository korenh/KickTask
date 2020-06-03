import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../protected/Firebase";
import Auth from "../protected/Auth";

export default class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        sessionStorage.setItem("id", email);
        Auth.login(() => {
          this.props.history.push("/main");
        });
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
        <br />
        <Link to="/register" className="link-style">
          Register
        </Link>
      </form>
    );
  }
}
