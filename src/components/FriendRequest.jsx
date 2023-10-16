import React, { useEffect, useState } from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import Grid from "@mui/material/Grid";

const FriendRequest = () => {
  const db = getDatabase();
  let userInfo = useSelector((state) => state.logedUser.value);
  let [reqList, setReqList] = useState([]);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (iteam.val().whoReceverID == userInfo.uid) {
          arr.push({ ...iteam.val(), frid: iteam.key });
        }
      });
      setReqList(arr);
    });
  }, []);

  let handleAccept = (iteam) => {
    set(push(ref(db, "friends")), {
      ...iteam,
    }).then(() => {
      remove(ref(db, "friendRequest/" + iteam.frid));
    });
  };

  let handleDelete = (iteam) => {
    remove(ref(db, "friendRequest/" + iteam.frid));
  };

  return (
    <div className="box">
      <h3>Friend Request</h3>

      {reqList.map((iteam) => (
        <div className="reqlist">
          <div className="req_profilepic">
            <Image src={iteam.whoSenderPicture} className="profilepic" />
          </div>
          <h4 className="reqName">{iteam.whoSenderName}</h4>
          <div className="reqbtn">
            <Button
              onClick={() => handleAccept(iteam)}
              className="reqAlistbtn"
              variant="contained"
            >
              Accept
            </Button>
            <Button
              onClick={() => handleDelete(iteam)}
              className="reqlistDelbtn"
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
