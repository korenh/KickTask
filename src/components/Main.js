import React, { Component } from "react";
import Nav from "./Nav";

class Main extends Component {
  state = {
    taskId: undefined,
    clicked: false,
    mainTask: [
      {
        id: 1,
        name: "Sport",
        taskCount: "23",
        priority: "minor",
        currentState: "in progress",
        list: [
          "koren is tierd",
          "koren is super tierd",
          "koren is very very tierd",
        ],
      },
      {
        id: 2,
        name: "Home",
        taskCount: "77",
        priority: "critical",
        currentState: "not started",
        list: [
          "koren is tierd",
          "koren is super tierd",
          "koren is very very tierd",
        ],
      },
      {
        id: 3,
        name: "Study",
        taskCount: "34",
        priority: "critical",
        currentState: "in progress",
        list: [
          "koren is tierd",
          "koren is super tierd",
          "koren is very very tierd",
        ],
      },
      {
        id: 4,
        name: "shit",
        taskCount: "67",
        priority: "minor",
        currentState: "done",
        list: [
          "koren is tierd",
          "koren is super tierd",
          "koren is very very tierd",
        ],
      },
    ],
  };

  handleClick = (task) => {
    this.setState({
      clicked: !this.state.clicked,
      taskId: task.id,
    });
  };

  render() {
    return this.state.clicked ? (
      <div>
        <h1>KICKTASK</h1>
        <div className="main-task-control">
          {this.state.mainTask
            .filter((main) => main.id === this.state.taskId)
            .map((main) => (
              <div
                className="chosen-task"
                onClick={() => this.handleClick(main)}
              >
                <p>
                  {main.name} | {main.taskCount}
                </p>
                <div>
                  <input type="text" className="input-form2" />
                  <button className="btn-add2">Add</button>
                </div>
                <div>
                  {main.list.map((li) => (
                    <div className="list-item">
                      <p>{li}</p>
                      <button className="dlt-tsk">x</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <Nav />
      </div>
    ) : (
      <div>
        <h1>KICKTASK</h1>
        <div className="main-task-control">
          {this.state.mainTask.map((main) => (
            <div
              className="main-task"
              onClick={() => this.handleClick(main)}
              key={main.id}
            >
              <p>{main.name}</p>
              <p>{main.taskCount}</p>
              <p>{main.priority}</p>
              <p>{main.currentState}</p>
            </div>
          ))}
        </div>
        <Nav />
      </div>
    );
  }
}

export default Main;
