import React, { useEffect, useState } from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
const Friends = () => {
  const db = getDatabase();
  let userInfo = useSelector((state) => state.logedUser.value);
  let [frList, setFRList] = useState([]);

  useEffect(() => {
    const friendstRef = ref(db, "friends");
    onValue(friendstRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push({ ...iteam.val(), fid: iteam.key });
      });
      setFRList(arr);
    });
  }, []);

  let handleBlock = (iteam) => {

    if (userInfo.uid == iteam.whoSenderID) {
      set(push(ref(db, "block")), {
        blockId: iteam.whoReceverID,
        blockName: iteam.whoReceverName,
        blockPic: iteam.whoReceverPicture,
        whoBlockerById: iteam.whoSenderID,
        whoBlockedByName: iteam.whoSenderName,
        whoBlockedBypic: iteam.whoSenderPicture,
      }).then(() => {
        remove(ref(db, "friends/" + iteam.fid));
      });
    } else {
      set(push(ref(db, "block")), {
        blockId: iteam.whoSenderID,
        blockName: iteam.whoSenderName,
        blockPic: iteam.whoSenderPicture,
        whoBlockerById: iteam.whoReceverID,
        whoBlockedByName: iteam.whoReceverName,
        whoBlockedBypic: iteam.whoReceverPicture,
      }).then(() => {
        remove(ref(db, "friends/" + iteam.fid));
      });
    }
  };

  return (
    <div className="box">
      <h3>Friends</h3>
      {frList.map((iteam, index) => (
        <div className="list">
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
          <Button
            onClick={() => handleBlock(iteam)}
            className="frlistbtn"
            variant="contained"
          >
            Block
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Friends;
