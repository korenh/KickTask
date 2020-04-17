import React from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={Main} />
    </Router>
  );
}
