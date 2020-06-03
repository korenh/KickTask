import React, { Component } from "react";
import Nav from "./Nav";
import firebase from "../protected/Firebase";
import Particles from "react-particles-js";

export default class Main extends Component {
  //--------------------------------------states ----------------------------------//

  state = {
    listChild: undefined,
    taskId: undefined,
    clicked: false,
    mainTask: [],
    selectedOption: false,
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
      .collection(sessionStorage.getItem("id"))
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
    firebase
      .firestore()
      .collection(sessionStorage.getItem("id"))
      .doc(main.id)
      .delete();
    alert("Deleted" + main.id);
    this.setState({
      clicked: false,
    });
    this.componentDidMount();
  }

  //--------------------------------------handle delete item ----------------------------------//

  handleDelete = (item, main) => {
    var array = main.list;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) {
        array.splice(i, 1);
      }
    }
    firebase
      .firestore()
      .collection(sessionStorage.getItem("id"))
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
      .collection(sessionStorage.getItem("id"))
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
        .collection(sessionStorage.getItem("id"))
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

  //-------------------------------------- hanle isChecked true count ----------------------------------//

  handleCalc = (list) => {
    var count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === true) {
        count = count + 1;
      }
    }
    return count;
  };

  //-------------------------------------- render page  ----------------------------------//

  render() {
    return this.state.clicked ? (
      //-------------------------------------- chosen list  ----------------------------------//

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
                      <div className="item-functions">
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
      //-------------------------------------- all Lists  ----------------------------------//

      <div>
        <Particles
          style={{ position: "fixed" }}
          params={{
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 1500,
                },
              },
            },
          }}
        />
        <div className="main-task-control">
          {this.state.mainTask.map((main) => (
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
          ))}
        </div>
        <Nav isOn={this.getData} />
      </div>
    );
  }
}
