import React, { useEffect , useState } from "react";
import Nav from "./Nav";
import firebase from "./Firebase";

export default function Main(){

  const [taskId , setTaskId] = useState('')
  const [clicked , setClicked] = useState(false)
  const [mainTask , setMainTask] = useState([])
  const [childitem , setChilditem] = useState('')

  useEffect(() => {
    getData()
  },[])

  const getData = () => {
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
        setMainTask(allData)
      });
  };

  const handleDeleteMain = (main) => {
    firebase
      .firestore()
      .collection(sessionStorage.getItem("id"))
      .doc(main.id)
      .delete();
    alert("Deleted" + main.id);
    setClicked(false)
    getData()
  }

  const handleDelete = (item, main) => {
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
    getData();
  };

  const addListItem = (task) => {
    let arr = task.list;
    arr.push({
      id: task.list.length,
      content: childitem,
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
    getData()
  };

  const handleClick = (task) => {
    setClicked(!clicked)
    setTaskId(task.id)
  };

  const handleCheck = (item, main) => {
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
      getData();
    }
  };

  const handleCalc = (list) => {
    var count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === true) {
        count = count + 1;
      }
    }
    return count;
  };

    return clicked ? (
      <div>
        <div className="main-task-control">
          {mainTask.filter((main) => main.id === taskId).map((main) => (
              <div className="chosen-task">
                <button onClick={() => handleClick(main)}className="btn-back">Back</button>
                <h3>{main.name}</h3>
                <div>
                  <input type="text" className="input-form2" value={childitem}
                    onChange={(e) => setChilditem(e.target.value)}/>
                  <button className="btn-add2" onClick={() => addListItem(main)}>Add</button>
                </div>
                <div>
                  {main.list.map((item) => (
                    <div className="list-item">
                    {item.isChecked ? (<p className="item-checked">{item.content}</p>):(<p>{item.content}</p>)}
                      <div className="item-functions">
                        <button className="dlt-tsk" onClick={() =>handleDelete(item, main)}>x</button>
                        <input type="checkbox" checked={item.isChecked} onChange={()=>handleCheck(item, main)}/>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-dlt2" onClick={() => handleDeleteMain(main)}>Delete all</button>
              </div>
            ))}
        </div>
        <Nav />
      </div>
    ) : (
      <div>
        <div className="main-task-control">
          {mainTask.map((main) => (
            <div className="main-task" onClick={() => handleClick(main)} key={main.id}>
              <div className="content-flex">
                <h3>{main.name} </h3>
                {handleCalc(main.list) === main.list.length ? "Cmopleted": "In progress"}
                <p>{handleCalc(main.list)}/{main.list.length}</p>
              </div>
            </div>
          ))}
        </div>
        <Nav isOn={getData} />
      </div>
    );
  }

