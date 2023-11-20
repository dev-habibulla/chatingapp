import React, { useEffect, useState } from "react";
import Image from "./Image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmojiPicker from "emoji-picker-react";
import Test from "../assets/login.png";
import ModalImage from "react-modal-image";
import { BsEmojiSmile, BsCardImage } from "react-icons/bs";
import { useSelector } from "react-redux";
import moment from "moment/moment";

import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as imgref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { AudioRecorder } from "react-audio-voice-recorder";

const Msg = () => {
  const db = getDatabase();
  const storage = getStorage();
  let [emojiShow, setEmojiShow] = useState(false);
  let [msg, setMsg] = useState("");
  let [audio, setAudio] = useState("");
  let [msgList, setMsgList] = useState([]);
  let [groupMsgList, setGroupMsgList] = useState([]);
  let [blockList, setBlockList] = useState([]);
  let activeInfo = useSelector((state) => state.activeChat.value);
  let userInfo = useSelector((state) => state.logedUser.value);

  const isBlocked = blockList.some((bitem) => bitem.whoBlockerById === userInfo.uid);



  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudio(blob);
  };

  let handleMsgSend = () => {

    {blockList.map((bitem)=>(
      bitem.blockId == userInfo.uid ?
console.log("not send")
:console.log("Done send")



     ))}


    // if (activeInfo.type === "single") {
    //   set(push(ref(db, "singleMsg")), {
    //     whoMsgSenderId: userInfo.uid,
    //     whoMsgSenderName: userInfo.displayName,
    //     whoMsgSenderPic: userInfo.photoURL,
    //     whoMsgReceverId: activeInfo.activeUid,
    //     whoMsgReceverName: activeInfo.activeName,
    //     whoMsgReceverPic: activeInfo.activePic,
    //     msg: msg,
    //     date: `${new Date().getFullYear()}-${
    //       new Date().getMonth() + 1
    //     }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    //   });
    //   setMsg("");
    // } else {
    //   console.log({
    //     whoMsgSenderId: userInfo.uid,
    //     whoMsgSenderName: userInfo.displayName,
    //     whoMsgSenderPic: userInfo.photoURL,
    //     MsgReceverGroupId: activeInfo.activeUid,
    //     MsgReceverGroupName: activeInfo.activeName,
    //     gMsg: msg,
    //   });

    //   set(push(ref(db, "groupMsg")), {
    //     whoMsgSenderId: userInfo.uid,
    //     whoMsgSenderName: userInfo.displayName,
    //     whoMsgSenderPic: userInfo.photoURL,
    //     MsgReceverGroupId: activeInfo.activeUid,
    //     MsgReceverGroupName: activeInfo.activeName,
    //     gMsg: msg,
    //     date: `${new Date().getFullYear()}-${
    //       new Date().getMonth() + 1
    //     }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    //   });
    //   setMsg("");
    // }



  };

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

  useEffect(() => {
    const groupMsgRef = ref(db, "groupMsg");
    onValue(groupMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (iteam.val().MsgReceverGroupId == activeInfo.activeUid) {
          arr.push(iteam.val());
        }
      });
      setGroupMsgList(arr);
    });
  }, [activeInfo]);

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
          arr.push(iteam.val());
        }
      });
      setMsgList(arr);
    });
  }, [activeInfo]);

  let hangleImageUpload = (e) => {
    const storageRef = imgref(storage, e.target.files[0].name + Date.now());

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeInfo.type === "single") {
          set(push(ref(db, "singleMsg")), {
            whoMsgSenderId: userInfo.uid,
            whoMsgSenderName: userInfo.displayName,
            whoMsgSenderPic: userInfo.photoURL,
            whoMsgReceverId: activeInfo.activeUid,
            whoMsgReceverName: activeInfo.activeName,
            whoMsgReceverPic: activeInfo.activePic,
            img: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        } else {
          set(push(ref(db, "groupMsg")), {
            whoMsgSenderId: userInfo.uid,
            whoMsgSenderName: userInfo.displayName,
            whoMsgSenderPic: userInfo.photoURL,
            MsgReceverGroupId: activeInfo.activeUid,
            MsgReceverGroupName: activeInfo.activeName,
            gImg: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        }
      });
    });
  };
  let handleAudioUpload = (e) => {
    const storageRef = imgref(storage, Date.now().toString());
    uploadBytes(storageRef, audio).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeInfo.type === "single") {
          set(push(ref(db, "singleMsg")), {
            whoMsgSenderId: userInfo.uid,
            whoMsgSenderName: userInfo.displayName,
            whoMsgSenderPic: userInfo.photoURL,
            whoMsgReceverId: activeInfo.activeUid,
            whoMsgReceverName: activeInfo.activeName,
            whoMsgReceverPic: activeInfo.activePic,
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        } else {
          set(push(ref(db, "groupMsg")), {
            whoMsgSenderId: userInfo.uid,
            whoMsgSenderName: userInfo.displayName,
            whoMsgSenderPic: userInfo.photoURL,
            MsgReceverGroupId: activeInfo.activeUid,
            MsgReceverGroupName: activeInfo.activeName,
            gAudio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        }
      });
    });
  };



  return (
    <>
      {activeInfo && (
        <div className="msgbox">
          <div className="activeChatData">
            <>
              <Image src={activeInfo.activePic} className="activeChatImg" />
              <h4>{activeInfo.activeName}</h4>
            </>
          </div>
          <div className="containermsg">
            {groupMsgList.map((item) =>
              item.gMsg ? (
                item.whoMsgSenderId == userInfo.uid ? (
                  <div className="sendmsg">
                    <p className="msgSendText">{item.gMsg}</p>
                    <h6 className="msgTime">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                ) : (
                  <div className="receivedmsg">
                    <p className="msgRecText">{item.gMsg}</p>
                    <p className="msgTime">{item.whoMsgSenderName}</p>
                    <h6 className="msgTime">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                )
              ) : item.gAudio ? (
                item.whoMsgSenderId == userInfo.uid ? (
                  <div className="sendaudio">
                    <audio src={item.gAudio} controls></audio>
                  </div>
                ) : (
                  <div className="receiveaudio">
                    <audio src={item.gAudio} controls></audio>
                  </div>
                )
              ) : item.whoMsgSenderId == userInfo.uid ? (
                <div className="sendimg">
                  <div className="imgbox">
                    <ModalImage
                      small={item.gImg}
                      large={item.gImg}
                      alt="Hello World!"
                    />
                  </div>
                  
                  <h6 className="msgTime">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                </div>
              ) : (
                <div className="receivedimg">
                  <div className="imgbox">
                    <ModalImage
                      small={item.gImg}
                      large={item.gImg}
                      alt="Hello World!"
                    />
                  </div>
                  <p className="msgTime">{item.whoMsgSenderName}</p>
                  <h6 className="msgTime">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </h6>
                </div>
              )

            )}

            {msgList.map((iteam) =>
              iteam.msg ? (
                iteam.whoMsgSenderId == userInfo.uid ? (
                  <div className="sendmsg">
                    <p className="msgSendText">{iteam.msg}</p>
                    <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                ) : (
                  <div className="receivedmsg">
                    <p className="msgRecText">{iteam.msg}</p>
                    <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                )
              ) : iteam.audio ? (
                iteam.whoMsgSenderId == userInfo.uid ? (
                  <div className="sendaudio">
                    <audio src={iteam.audio} controls></audio>
                    <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                ) : (
                  <div className="receiveaudio">
                    <audio src={iteam.audio} controls></audio>
                    <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                  </div>
                )
              ) : iteam.whoMsgSenderId == userInfo.uid ? (
                <div className="sendimg">
                  <div className="imgbox">
                    <ModalImage
                      small={iteam.img}
                      large={iteam.img}
                      alt="Hello World!"
                    />
                  </div>
                  <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                </div>
              ) : (
                <div className="receivedimg">
                  <div className="imgbox">
                    <ModalImage
                      small={iteam.img}
                      large={iteam.img}
                      alt="Hello World!"
                    />
                  </div>
                  <h6 className="msgTime">
                      {moment(iteam.date, "YYYYMMDD hh:mm").fromNow()}
                    </h6>
                </div>
              )
            )}

            {/* 
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
         
        <div className="inputBox">
        {  
          audio ? (
            <>
              <audio src={URL.createObjectURL(audio)} controls></audio>
              <Button variant="contained" onClick={handleAudioUpload}>
                Send
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setAudio("")}
              >
                Delete
              </Button>
            </>
          ) : (
            <div className="msgField">
              <div className="audioSendbtn">
                <AudioRecorder
                  onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadOnSavePress={false}
                  downloadFileExtension="webm"
                />
              </div>

              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <div className="sendContainer">
                <BsEmojiSmile
                  className="emjibtn"
                  onClick={() => setEmojiShow(!emojiShow)}
                />
                <label>
                  <input type="file" hidden onChange={hangleImageUpload} />
                  <BsCardImage
                    className="imgSendbtn"
                    // onClick={() => setEmojiShow(!emojiShow)}
                  />
                </label>
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
                  <EmojiPicker onEmojiClick={(e) => setMsg(msg + e.emoji)} />
                </div>
              )}
            </div>
          )}

        </div>
        
       
     
       


        




        </div>
      )}
    </>
  );
};

export default Msg;
