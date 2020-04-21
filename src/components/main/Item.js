import React, { Component } from "react";

class Item extends Component {
  state = {
    clicked: false,
  };

  handleClick = (task) => {
    this.props.isClicked(taskId);
  };

  handleCalc = (list) => {
    var count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === true) {
        count = count + 1;
      }
    }
    return count;
  };

  render(props) {
    const { main } = this.props;
    return (
      <div
        className="main-task"
        onClick={() => this.handleClick(main)}
        key={main.id}
      >
        <div className="content-flex">
          <h3>{main.name} </h3>
          {this.handleCalc(main.list) === main.list.length
            ? "Cmopleted"
            : "In progress"}
          <p>
            {this.handleCalc(main.list)}/{main.list.length}
          </p>
        </div>
      </div>
    );
  }
}

export default Item;
