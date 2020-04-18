import React, { Component } from "react";
import Exit from "../icons/exit.png";
import Share from "../icons/share.png";
import firebase from "./Firebase";

class Nav extends Component {
  state = {
    createNew: false,
  };

  addData = async (e) => {
    e.preventDefault();
    let vname = e.target.elements.name.value;
    let vstate = e.target.elements.state.value;
    let vstatus = e.target.elements.status.value;
    let vlist = [];
    firebase.firestore().collection("Main").add({
      name: vname,
      state: vstate,
      status: vstatus,
      list: vlist,
    });
    this.setState({
      createNew: !this.state.createNew,
    });
  };

  showForm = () => {
    this.setState({
      createNew: !this.state.createNew,
    });
  };

  render() {
    return (
      <div className="nav-main">
        {this.state.createNew ? (
          <form className="form-main-add" onSubmit={this.addData}>
            <input
              name="name"
              type="text"
              className="input-form"
              placeholder="name"
            />
            <br />
            <input
              name="state"
              type="text"
              className="input-form"
              placeholder="state"
            />{" "}
            <br />
            <input
              name="status"
              type="text"
              className="input-form"
              placeholder="status"
            />{" "}
            <br />
            <button className="btn-form">Add</button>
          </form>
        ) : (
          <div className="top-nav"></div>
        )}
        <div className="bottom-nav">
          <img alt="icon" src={Exit} className="icon-main" />
          <button className="btn-add" onClick={this.showForm}>
            +
          </button>
          <img alt="icon" src={Share} className="icon-main" />
        </div>
      </div>
    );
  }
}

export default Nav;
