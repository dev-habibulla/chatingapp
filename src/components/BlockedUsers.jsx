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

const BlockedUsers = () => {
  const db = getDatabase();
  let userInfo = useSelector((state) => state.logedUser.value);
  let [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push({ ...iteam.val(), bid: iteam.key });
      });
      setBlockList(arr);
    });
  }, []);

  let handleUnblock = (iteam) => {
    set(push(ref(db, "friends/")), {
      whoSenderName: iteam.whoBlockedByName,
      whoSenderID: iteam.whoBlockerById,
      whoSenderPicture: iteam.whoBlockedBypic,
      whoReceverName: iteam.blockName,
      whoReceverID: iteam.blockId,
      whoReceverPicture: iteam.blockPic,
    }).then(() => {
      remove(ref(db, "block/" + iteam.bid));
    });
  };
  let handleUnblockUser = (iteam) => {
    remove(ref(db, "block/" + iteam.bid));
  };

  return (
    <div className="box">
      <h3>Blocked Users</h3>
      {blockList.map((iteam) =>
        iteam.whoBlockerById == userInfo.uid ? (
          <div className="list">
            <Image src={iteam.blockPic} className="profilepic" />
            <h4>{iteam.blockName}</h4>
            <div className="mygrBtnbox">
              <Button
                onClick={() => handleUnblock(iteam)}
                className="reqAlistbtn"
                variant="contained"
              >
                Unblock
              </Button>
              <Button
                onClick={() => handleUnblockUser(iteam)}
                className="reqlistDelbtn"
                variant="contained"
              >
               Unblock2
              </Button>
            </div>
          </div>
        ) :iteam.blockId == userInfo.uid?(
          
          <div className="list">
            <Image src={iteam.whoBlockedBypic} className="profilepic" />
            <h4>{iteam.whoBlockedByName}</h4>
          </div>
        ):(
          <h4></h4>
        )
      )}
    </div>
  );
};

export default BlockedUsers;
