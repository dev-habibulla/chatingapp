import React, { useEffect, useState } from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const Friends = () => {
  const db = getDatabase();
  let [taskArr, setTaskArr] = useState([]);
  let [id, setId] = useState("");

  useEffect(() => {
    const ToDoRef = ref(db, "users");
    onValue(ToDoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push({ ...iteam.val(), id: iteam.key });
      });
      setTaskArr(arr);
    });
  }, []);

  return (
    <div className="box">
      <h3>Friends</h3>
      {taskArr.map((iteam, index) => (
        <div className="list">
          <Image src={iteam.profile_picture} className="profilepic" />
          <h4>{iteam.username}</h4>
          <Button className="listbtn" variant="contained">Join</Button>
        </div>
      ))}
    </div>
  );
};


export default Friends;
