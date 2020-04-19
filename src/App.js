import React, { Component } from "react";
import Login from "./components//sign/Login";
import Register from "./components/sign/Register";
import Main from "./components/main/Main";
import { Protected } from "./components/protected/Protected";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Protected path="/main" component={Main} />
      </Router>
    );
  }
}
