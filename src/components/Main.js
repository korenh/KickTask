import React, { Component } from "react";
import Nav from "./Nav";
import firebase from "./Firebase";

class Main extends Component {
  state = {
    listChild: undefined,
    taskId: undefined,
    clicked: false,
    mainTask: [],
  };

  componentDidMount() {
    const allData = [];
    firebase
      .firestore()
      .collection("Main")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            state: doc.data().state,
            status: doc.data().status,
            list: doc.data().list,
          };
          allData.push(data);
        });
        this.setState({ mainTask: allData });
      });
  }

  handleDeleteMain(main) {
    firebase.firestore().collection("Main").doc(main.id).delete();
    alert("Deleted" + main.id);
    this.setState({
      clicked: false,
    });
    this.componentDidMount();
  }

  handleDelete = (item, main) => {
    console.log(main.id);
    console.log(item.id);
  };

  handleChange = (e) => {
    this.setState({
      childitem: e.target.value,
    });
    console.log(this.state.childitem);
  };

  addListItem = (task) => {
    let arr = task.list;
    arr.push({ id: task.list.length, content: this.state.childitem });
    firebase
      .firestore()
      .collection("Main")
      .doc(task.id)
      .set({
        name: task.name,
        state: task.state,
        status: task.status,
        list: arr,
      })
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        console.error("Error", error);
      });
    this.componentDidMount();
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
              <div className="chosen-task">
                <button
                  onClick={() => this.handleClick(main)}
                  className="btn-back"
                >
                  Back
                </button>
                <p>
                  {main.name} | {main.taskCount}
                </p>
                <div>
                  <input
                    type="text"
                    className="input-form2"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn-add2"
                    onClick={() => this.addListItem(main)}
                  >
                    Add
                  </button>
                </div>
                <div>
                  {main.list.map((item) => (
                    <div className="list-item">
                      <p>{item.content}</p>
                      <button
                        className="dlt-tsk"
                        onClick={() => this.handleDelete(item, main)}
                      >
                        x
                      </button>
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
              <p>{main.id}</p>
              <p>{main.name}</p>
              <p>{main.state}</p>
              <p>{main.status}</p>
              <button
                className="btn-back"
                onClick={() => this.handleDeleteMain(main)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <Nav />
      </div>
    );
  }
}

export default Main;
