import React, { Component } from "react";
import Nav from "./Nav";
import firebase from "./Firebase";

class Main extends Component {
  //--------------------------------------states ----------------------------------//

  state = {
    listChild: undefined,
    taskId: undefined,
    clicked: false,
    mainTask: [],
    selectedOption: false,
    counter: 0,
  };

  //--------------------------------------componentDidMount ----------------------------------//

  componentDidMount() {
    this.getData();
  }

  //--------------------------------------handle get data ----------------------------------//

  getData = () => {
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
  };

  //--------------------------------------handle delete list ----------------------------------//

  handleDeleteMain(main) {
    firebase.firestore().collection("Main").doc(main.id).delete();
    alert("Deleted" + main.id);
    this.setState({
      clicked: false,
    });
    this.componentDidMount();
  }

  //--------------------------------------handle delte item ----------------------------------//

  handleDelete = (item, main) => {
    var array = main.list;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) {
        array.splice(i, 1);
      }
    }
    firebase
      .firestore()
      .collection("Main")
      .doc(main.id)
      .set({
        name: main.name,
        state: main.state,
        status: main.status,
        list: array,
      })
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        console.error("Error", error);
      });
    this.getData();
  };

  //--------------------------------------handle input change ----------------------------------//

  handleChange = (e) => {
    this.setState({
      childitem: e.target.value,
    });
  };

  //--------------------------------------handle add item ----------------------------------//

  addListItem = (task) => {
    let arr = task.list;
    arr.push({
      id: task.list.length,
      content: this.state.childitem,
      isChecked: false,
    });
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

  //--------------------------------------handle open list ----------------------------------//

  handleClick = (task) => {
    this.setState({
      clicked: !this.state.clicked,
      taskId: task.id,
    });
  };

  //--------------------------------------handle check ----------------------------------//

  handleCheck = (item, main) => {
    var array = main.list;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) {
        array[i].isChecked = !item.isChecked;
      }
      firebase
        .firestore()
        .collection("Main")
        .doc(main.id)
        .set({
          name: main.name,
          state: main.state,
          status: main.status,
          list: array,
        })
        .then(function () {
          console.log("success");
        })
        .catch(function (error) {
          console.error("Error", error);
        });
      this.getData();
    }
  };

  //-------------------------------------- render page  ----------------------------------//

  render() {
    return this.state.clicked ? (
      <div>
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
                <h3>{main.name}</h3>
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
                      {item.isChecked ? (
                        <p className="item-checked">{item.content}</p>
                      ) : (
                        <p>{item.content}</p>
                      )}
                      <div>
                        <button
                          className="dlt-tsk"
                          onClick={() => this.handleDelete(item, main)}
                        >
                          x
                        </button>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => this.handleCheck(item, main)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-dlt2"
                  onClick={() => this.handleDeleteMain(main)}
                >
                  Delete all
                </button>
              </div>
            ))}
        </div>
        <Nav />
      </div>
    ) : (
      <div>
        <div className="main-task-control">
          {this.state.mainTask.map((main) => (
            <div
              className="main-task"
              onClick={() => this.handleClick(main)}
              key={main.id}
            >
              <div className="content-flex">
                <h3>{main.name} </h3>
                <p>
                  {this.state.counter}/{main.list.length}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Nav isOn={this.getData} />
      </div>
    );
  }
}

export default Main;
