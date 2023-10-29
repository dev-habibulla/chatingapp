import React, { useEffect, useState } from "react";
import Image from "./Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmojiPicker from "emoji-picker-react";
import Test from "../assets/login.png";
import ModalImage from "react-modal-image";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";

const Msg = () => {
  const db = getDatabase();
  let [emojiShow, setEmojiShow] = useState(false);
  let [msg, setMsg] = useState("");
  let [msgList, setMsgList] = useState([]);
  let activeInfo = useSelector((state) => state.activeChat.value);
  let userInfo = useSelector((state) => state.logedUser.value);

  useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg");
    onValue(singleMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (
          (iteam.val().whoMsgSenderId == userInfo.uid &&
            iteam.val().whoMsgReceverId == activeInfo.activeUid) ||
          (iteam.val().whoMsgSenderId == activeInfo.activeUid &&
            iteam.val().whoMsgReceverId == userInfo.uid)
        ) {
          arr.push(...iteam.val());
        }
      });
      setMsgList(arr);
    });
  }, []);
  let handleMsgSend = () => {
    if (activeInfo.type === "single") {
      const currentDate = new Date();
      const messageData = {
        whoMsgSenderId: userInfo.uid,
        whoMsgSenderName: userInfo.displayName,
        whoMsgSenderPic: userInfo.photoURL,
        whoMsgReceverId: activeInfo.activeUid,
        whoMsgReceverName: activeInfo.activeName,
        whoMsgReceverPic: activeInfo.activePic,
        msg: msg,
        date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`,
      };
  
      // Push the message data to the "singleMsg" database reference
      push(ref(db, "singleMsg"), messageData);
    } else {
      console.log("hshsdhs");
    }
  };
  
  return (
    <div className="msgbox">
      <div className="activeChatData">
        {/* <Image src={activeInfo.activePic} className="activeChatImg" />
            <h4>{activeInfo.activeName}</h4> */}
        {activeInfo && (
          <>
            <Image src={activeInfo.activePic} className="activeChatImg" />
            <h4>{activeInfo.activeName}</h4>
          </>
        )}
      </div>
      <div className="containermsg">
        {msgList.map((iteam) =>
          iteam.whoMsgSenderId == userInfo.uid ? (
            <div className="sendmsg">
              <p>{iteam.msg}</p>
            </div>
          ) : (
            <div className="receivedmsg">
              <p>{iteam.msg}</p>
            </div>
          )
        )}

        {/* <div className="sendimg">
          <div className="imgbox">
            <ModalImage small={Test} large={Test} alt="Hello World!" />;
          </div>
        </div>
        <div className="receivedimg">
          <div className="imgbox">
            <ModalImage small={Test} large={Test} alt="Hello World!" />;
          </div>
        </div>
        <div className="sendaudio">
          <audio controls></audio>
        </div>
        <div className="receiveaudio">
          <audio controls></audio>
        </div>
        <div className="sendvideo">
          <video width="320" height="240" controls></video>
        </div>
        <div className="receivevideo">
          <video width="320" height="240" controls></video>
        </div> */}
      </div>
      <div className="msgField">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setMsg(e.target.value)}
        />
        <div className="sendContainer">
          <BsEmojiSmile
            className="emjibtn"
            onClick={() => setEmojiShow(!emojiShow)}
          />
          <Button
            variant="contained"
            className="sendbtn"
            onClick={handleMsgSend}
          >
            Send
          </Button>
        </div>
        {emojiShow && (
          <div className="emojiholder">
            <EmojiPicker />
          </div>
        )}
      </div>
    </div>
  );
};

export default Msg;
