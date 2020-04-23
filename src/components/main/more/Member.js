import React, { Component } from "react";

class Members extends Component {
  render() {
    return (
      <div className="form-main" onSubmit={this.addData}>
        <h1>Members</h1>
        <h2>members list </h2>
      </div>
    );
  }
}

export default Members;
