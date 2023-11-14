import React, { useEffect, useState } from "react";
import Image from "./Image";
import Button from "@mui/material/Button";
import { activeChat } from "../slices/activeChatSlice";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
const FriendMessegeList = () => {
  const db = getDatabase();
  let userInfo = useSelector((state) => state.logedUser.value);
  let [frList, setFRList] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    const friendstRef = ref(db, "friends");
    onValue(friendstRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (
          iteam.val().whoSenderID == userInfo.uid ||
          iteam.val().whoReceverID == userInfo.uid
        ) {
          arr.push({ ...iteam.val(), fid: iteam.key });
        }
      });
      setFRList(arr);
    });
  }, []);

  let handleActiveChat = (iteam) => {
    if (userInfo.uid == iteam.whoSenderID) {
      dispatch(
        activeChat({
          type: "single",
          activeUid: iteam.whoReceverID,
          activeName: iteam.whoReceverName,
          activePic: iteam.whoReceverPicture,
        })
      );
    } else {
      dispatch(
        activeChat({
          type: "single",
          activeUid: iteam.whoSenderID,
          activeName: iteam.whoSenderName,
          activePic: iteam.whoSenderPicture,
        })
      );
    }
  };

  return (
    <div className="box">
      <h3>Friends</h3>
      {frList.map((iteam, index) => (
        <div className="list" onClick={() => handleActiveChat(iteam)}>
          <Image
            src={
              iteam.whoSenderID == userInfo.uid
                ? iteam.whoReceverPicture
                : iteam.whoSenderPicture
            }
            className="profilepic"
          />
          <h4>
            {iteam.whoSenderID == userInfo.uid
              ? iteam.whoReceverName
              : iteam.whoSenderName}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default FriendMessegeList;
