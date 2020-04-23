import React, { Component } from "react";
import firebase from "../../protected/Firebase";

class Account extends Component {
  state = {
    listSize: "",
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection(sessionStorage.getItem("id"))
      .get()
      .then((snapshot) => {
        this.setState({ listSize: snapshot.size });
      });
  }

  render() {
    return (
      <div className="form-main">
        <h2>Account</h2>
        <h3>Email | {sessionStorage.getItem("id")}</h3>
        <h3>TasksList | {this.state.listSize}</h3>
      </div>
    );
  }
}

export default Account;
