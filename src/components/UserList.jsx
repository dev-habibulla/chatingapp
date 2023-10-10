import React, { useEffect, useState } from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from "@mui/material/Button";
import { FaUserPlus } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
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
  let [reqBtnLoad, setReqBtnLoad] = useState(false);
  let [reqList, setReqList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  let [blockList, setBlockList] = useState([]);
  let [reqDel, setReqDel] = useState([]);

  let userInfo = useSelector((state) => state.logedUser.value);

  useEffect(() => {
    const userRef = ref(db, "users");

    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (userInfo.uid != iteam.key) {
          arr.push({ ...iteam.val(), userId: iteam.key });
        }
      });
      setUsersList(arr);
    });
  }, []);

  let handleFriendRequest = (info) => {
    // console.log("info",userInfo.uid,userInfo.displayName);

    // setReqBtnLoad(true);

    set(push(ref(db, "friendRequest")), {
      whoSenderName: userInfo.displayName,
      whoSenderID: userInfo.uid,
      whoSenderPicture: userInfo.photoURL,
      whoReceverName: info.username,
      whoReceverID: info.userId,
      whoReceverPicture: info.profile_picture,
    }).then(() => {
      setReqBtnLoad(false);
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push(iteam.val().whoReceverID + iteam.val().whoSenderID);
        // arr.push({frid: iteam.key})
      });
      setReqList(arr);
    });
  }, []);

  useEffect(() => {
    const friendRef = ref(db, "friends");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push(iteam.val().whoReceverID + iteam.val().whoSenderID);
        // arr.push({frid: iteam.key})
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push(iteam.val().blockId + iteam.val().whoBlockerById);
        // arr.push({frid: iteam.key})
        console.log(iteam);
      });
      setBlockList(arr);
    });
  }, []);

  let handleReqDelete = (iteam) => {
    // console.log(iteam.frid);
    console.log(iteam);

    // remove(ref(db, "friendrequest/" + item.id));
    //     remove(ref(db, 'friendRequest/' + iteam.frid))
  };

  return (
    <div className="box">
      <h3>User List</h3>
      {usersList.map((iteam, index) => (
        <div className="reqlist">
          <div className="req_profilepic">
            <Image src={iteam.profile_picture} className="profilepic" />
          </div>

          <h4>{iteam.username}</h4>

          {reqList.includes(iteam.userId + userInfo.uid) ? (
            <Button
              onClick={() => handleReqDelete(iteam)}
              className="reqlistDelbtn"
              variant="contained"
            >
              {" "}
              Cancel
            </Button>
          ) : reqList.includes(userInfo.uid + iteam.userId) ? (
            <Button className="reqlistbtn" variant="contained">
              {" "}
              pending{" "}
            </Button>
          ) : friendList.includes(iteam.userId + userInfo.uid) ||
            friendList.includes(userInfo.uid + iteam.userId) ? (
            <Button className="listbtn" variant="contained">
              Friend
            </Button>
          ) : blockList.includes(iteam.userId + userInfo.uid) ||
          blockList.includes(userInfo.uid + iteam.userId) ? (
          <Button className="listbtn" variant="contained">
            Block
          </Button>)
          
          : (
            <Button
              onClick={() => handleFriendRequest(iteam)}
              className="listbtn"
              variant="contained"
            >
              <FaUserPlus className="listbtnicon" />
            </Button>
          )}
          {/* {reqBtnLoad ? (
            <Button className="listbtn" variant="contained">
              <RotatingLines
                strokeColor="white"
                strokeWidth="3"
                animationDuration="0.75"
                width="16"
                visible={true}
              />
            </Button>
          ) : (
            <Button
              onClick={() => handleFriendRequest(iteam)}
              className="listbtn"
              variant="contained"
            >
              <FaUserPlus className="listbtnicon" />
            </Button>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default UserList;
