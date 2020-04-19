import React, { Component } from "react";
import firebase from "../protected/Firebase";

export default class Nav extends Component {
  state = {
    createNew: false,
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
      firebase.firestore().collection("Main").add({
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
          <div className="top-nav"></div>
        )}
        <div className="bottom-nav">
          <p>Welcome,koren</p>
          <button className="btn-add" onClick={this.showForm}>
            +
          </button>
          <p>Share Task</p>
        </div>
      </div>
    );
  }
}
