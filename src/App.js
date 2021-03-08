import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import Particles from "react-particles-js";
import { Protected } from "./components/Protected";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export default function App(){
    return (
      <Router>
        <Particles className="Particles" 
        params={{particles:{number:{value: 50,density:{enable: true,value_area: 3000,},},},}}
        />
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Protected path="/main" component={Main} />
        <Redirect to="/" />
      </Router>
    );
}
