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
    if (vname === "") {
      alert("fill all the fields");
      this.setState({
        createNew: !this.state.createNew,
      });
    } else {
      firebase.firestore().collection("Main").add({
        name: vname,
        state: vstate,
        status: vstatus,
        list: vlist,
      });
      this.setState({
        createNew: !this.state.createNew,
      });
    }
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
            <select className="input-form-s" name="state">
              <option className="form-input-s" selected value="critical">
                critical
              </option>
              <option className="form-option" value="minor">
                minor
              </option>
              <option className="form-option" value="middle">
                middle
              </option>
            </select>
            <br />
            <select className="input-form-s" name="status">
              <option className="form-input-s" selected value="done">
                done
              </option>
              <option className="form-option" value="pending">
                pending
              </option>
              <option className="form-option" value="in progress">
                in progress
              </option>
            </select>
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
