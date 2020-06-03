import React, { Component } from "react";
import Login from "./components//sign/Login";
import Register from "./components/sign/Register";
import Main from "./components/main/Main";
import Particles from "react-particles-js";
import { Protected } from "./components/protected/Protected";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Particles
          className="Particles"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 2000,
                },
              },
            },
          }}
        />
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Protected path="/main" component={Main} />
        <Redirect to="/" />
      </Router>
    );
  }
}
