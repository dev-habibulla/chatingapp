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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserList = () => {
  const db = getDatabase();
  let [usersList, setUsersList] = useState([]);
  let [searchUsersList, setSearchUsersList] = useState([]);
  let [searchValue, seSearchValue] = useState("");
  let [id, setId] = useState("");
  let [reqBtnLoad, setReqBtnLoad] = useState(false);
  let [reqList, setReqList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  let [blockList, setBlockList] = useState([]);
  let [fRQcancel, setFRQcancel] = useState("");

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

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((iteam) => {
        arr.push(iteam.val().whoReceverID + iteam.val().whoSenderID);
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
      });
      setBlockList(arr);
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

  let handleReqCancle = (item) => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((fRQitem) => {
        if (
          fRQitem.val().whoSenderID === userInfo.uid &&
          fRQitem.val().whoReceverID === item.userId
        ) {
          const frRQId = fRQitem.key;
          remove(ref(db, "friendRequest/" + frRQId));
        }
      });
    });
  };

  let handleSearch = (e) => {
    seSearchValue(e.target.value);
    let searchUser = usersList.filter((item) =>
      item.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchUsersList(searchUser);
  };

  return (
    <div className="box">
      <h3>User List</h3>
      <TextField
        className="serchInput"
        id="outlined-basic"
        onChange={handleSearch}
        label="Outlined"
        variant="outlined"
      />

      {searchUsersList.length > 0 ? (
        searchUsersList.map((iteam, index) => (
          <div className="reqlist">
            <div className="req_profilepic">
              <Image src={iteam.profile_picture} className="profilepic" />
            </div>

            <h4>{iteam.username}</h4>

            {reqList.includes(iteam.userId + userInfo.uid) ? (
              <Button
                onClick={() => handleReqCancle(iteam)}
                className="frlistbtn"
                variant="contained"
              >
                Cancel
              </Button>
            ) : reqList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="frlistbtn" variant="contained">
                pending
              </Button>
            ) : friendList.includes(iteam.userId + userInfo.uid) ||
              friendList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="listbtn" variant="contained">
                Friend
              </Button>
            ) : blockList.includes(iteam.userId + userInfo.uid) ||
              blockList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="frlistbtn" variant="contained">
                Block
              </Button>
            ) : reqBtnLoad ? (
              <Button className="addFrbtn" variant="contained">
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
                className="addFrbtn"
                variant="contained"
              >
                add friend
              </Button>
            )}
          </div>
        ))
      ) : searchValue ? (
        <h1>Not Found</h1>
      ) : (
        usersList.map((iteam, index) => (
          <div className="reqlist">
            <div className="req_profilepic">
              <Image src={iteam.profile_picture} className="profilepic" />
            </div>

            <h4>{iteam.username}</h4>

            {reqList.includes(iteam.userId + userInfo.uid) ? (
              <Button
                onClick={() => handleReqCancle(iteam)}
                className="frlistbtn"
                variant="contained"
              >
                Cancel
              </Button>
            ) : reqList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="frlistbtn" variant="contained">
                pending
              </Button>
            ) : friendList.includes(iteam.userId + userInfo.uid) ||
              friendList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="listbtn" variant="contained">
                Friend
              </Button>
            ) : blockList.includes(iteam.userId + userInfo.uid) ||
              blockList.includes(userInfo.uid + iteam.userId) ? (
              <Button className="frlistbtn" variant="contained">
                Block
              </Button>
            ) : reqBtnLoad ? (
              <Button className="addFrbtn" variant="contained">
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
                className="addFrbtn"
                variant="contained"
              >
                add friend
              </Button>
            )}
          </div>
        ))
      )}
      {/* {usersList.map((iteam, index) => (
        <div className="reqlist">
          <div className="req_profilepic">
            <Image src={iteam.profile_picture} className="profilepic" />
          </div>

          <h4>{iteam.username}</h4>

          {reqList.includes(iteam.userId + userInfo.uid) ? (
            <Button
              onClick={() => handleReqCancle(iteam)}
              className="frlistbtn"
              variant="contained"
            >
              Cancel
            </Button>
          ) : reqList.includes(userInfo.uid + iteam.userId) ? (
            <Button className="frlistbtn" variant="contained">
              pending
            </Button>
          ) : friendList.includes(iteam.userId + userInfo.uid) ||
            friendList.includes(userInfo.uid + iteam.userId) ? (
            <Button className="listbtn" variant="contained">
              Friend
            </Button>
          ) : blockList.includes(iteam.userId + userInfo.uid) ||
            blockList.includes(userInfo.uid + iteam.userId) ? (
            <Button className="frlistbtn" variant="contained">
              Block
            </Button>
          ) : reqBtnLoad ? (
            <Button className="addFrbtn" variant="contained">
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
              className="addFrbtn"
              variant="contained"
            >
              add friend
            </Button>
          )}
          
        </div>
      ))} */}
    </div>
  );
};

export default UserList;
