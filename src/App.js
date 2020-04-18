import React, { Component } from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
      </Router>
    );
  }
}
