import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div className="login-form">
        <h1>KICKTASK</h1>
        <br />
        <input type="text" className="input-form" placeholder="Name" />
        <br />
        <input type="text" className="input-form" placeholder="Password" />
        <br />
        <Link to="/main">
          <button className="btn-form">LOGIN</button>
        </Link>
      </div>
    );
  }
}
