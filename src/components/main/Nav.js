import React, { useState } from "react";
import firebase from "../protected/Firebase";

export default function Nav(props){
  
  const [createNew , setCreateNew] = useState(false)
  const [vstate , setVstate] = useState(false)
  const [name , setName] = useState(false)

  const addData = async (e) => {
    let vlist = [];
    if (name === "") {
      alert("fill all the fields");
      setCreateNew(!createNew)
    } else {
      firebase.firestore().collection(sessionStorage.getItem("id")).add({
        name: name,
        state: vstate,
        status: "unavailable",
        list: vlist,
      });
      setCreateNew(!createNew)
      props.isOn();
    }
  };

    return (
      <div className="nav-main">
        {createNew ? (
          <div className="form-main">
            <input type="text" className="input-form" placeholder="name" onChange={e=>setName(e.target.value)}/>
            <br />
            <select className="input-form-s" onChange={e=>setVstate(e.target.value)}>
              <option selected value="critical">critical</option>
              <option value="minor">minor</option>
              <option value="middle">middle</option>
            </select>
            <br />
            <button className="btn-form" onClick={e=>addData(e)}>Add</button>
          </div>
          ) : ("")}
        <div className="bottom-nav">
          <button className="btn-add" onClick={()=>setCreateNew(!createNew)}>+</button>
        </div>
      </div>
    );
  }

