import React, { useEffect, useState } from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";

const TestAllRegList = () => {
    const db = getDatabase();
    let [taskArr, setTaskArr] = useState([]);
  
    useEffect(() => {
      const ToDoRef = ref(db, "users");
      onValue(ToDoRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((iteam) => {
          arr.push(iteam.val());
        });
        setTaskArr(arr);
      });
    }, []);
  
    return (
        
      <div className="boxtest">
        <h3>All Registration List</h3>
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
  

export default TestAllRegList