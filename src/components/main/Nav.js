import React, { Component } from "react";
import firebase from "../protected/Firebase";
import Member from "./more/Member";
import Account from "./more/Account";

export default class Nav extends Component {
  state = {
    createNew: false,
    membersPage: false,
    accountPage: false,
  };

  addData = async (e) => {
    e.preventDefault();
    let vname = e.target.elements.name.value;
    let vstate = e.target.elements.state.value;
    let vlist = [];
    if (vname === "") {
      alert("fill all the fields");
      this.setState({
        createNew: !this.state.createNew,
      });
    } else {
      firebase.firestore().collection(sessionStorage.getItem("id")).add({
        name: vname,
        state: vstate,
        status: "unavailable",
        list: vlist,
      });
      this.setState({
        createNew: !this.state.createNew,
      });
      this.props.isOn();
    }
  };

  showForm = () => {
    this.setState({
      createNew: !this.state.createNew,
      accountPage: false,
      membersPage: false,
    });
  };

  members = () => {
    this.setState({
      membersPage: !this.state.membersPage,
      accountPage: false,
      createNew: false,
    });
  };

  account = () => {
    this.setState({
      accountPage: !this.state.accountPage,
      membersPage: false,
      createNew: false,
    });
  };

  render() {
    return (
      <div className="nav-main">
        {this.state.createNew ? (
          <form className="form-main" onSubmit={this.addData}>
            <input
              name="name"
              type="text"
              className="input-form"
              placeholder="name"
            />
            <br />
            <select className="input-form-s" name="state">
              <option selected value="critical">
                critical
              </option>
              <option value="minor">minor</option>
              <option value="middle">middle</option>
            </select>
            <br />
            <button className="btn-form">Add</button>
          </form>
        ) : (
          ""
        )}
        {this.state.membersPage ? <Member /> : ""}
        {this.state.accountPage ? <Account /> : ""}
        <div className="bottom-nav">
          <p className="p-click" onClick={this.account}>
            Account
          </p>
          <button className="btn-add" onClick={this.showForm}>
            +
          </button>
          <p onClick={this.members} className="p-click">
            Members
          </p>
        </div>
      </div>
    );
  }
}
