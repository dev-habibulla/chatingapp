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
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  let [usersList, setUsersList] = useState([]);
  let [id, setId] = useState("");
  let userInfo = useSelector((state) => state.logedUser.value);

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (userInfo.uid != iteam.key) {
          arr.push(iteam.val());
        }
      });
      setUsersList(arr);
    });
  }, []);

  let handleFriendRequest =()=>{
    console.log("send");
  }

  return (
    <div className="box">
      <h3>User List</h3>
      {usersList.map((iteam, index) => (
        <div className="list">
          <Image src={iteam.profile_picture} className="profilepic" />
          <h4>{iteam.username}</h4>
          <Button onClick={handleFriendRequest} className="listbtn" variant="contained">
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
