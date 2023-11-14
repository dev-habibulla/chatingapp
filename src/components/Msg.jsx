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
  let activeInfo = useSelector((state) => state.activeChat.value);
  let userInfo = useSelector((state) => state.logedUser.value);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);

    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    setAudio(blob);
  };

  let handleMsgSend = () => {
    if (activeInfo.type === "single") {
      set(push(ref(db, "singleMsg")), {
        whoMsgSenderId: userInfo.uid,
        whoMsgSenderName: userInfo.displayName,
        whoMsgSenderPic: userInfo.photoURL,
        whoMsgReceverId: activeInfo.activeUid,
        whoMsgReceverName: activeInfo.activeName,
        whoMsgReceverPic: activeInfo.activePic,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
      setMsg("");
    } else {
      console.log("hshsdhs");
    }
  };

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
    console.log(e.target.files[0]);

    const storageRef = imgref(storage, e.target.files[0].name + Date.now());

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
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
          console.log("hehehe");
        }

        console.log("File available at", downloadURL);
      });
    });
  };
  let handleAudioUpload = (e) => {
    const storageRef = imgref(storage, Date.now().toString());

    // 'file' comes from the Blob or File API
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
          });
        } else {
          console.log("hehehe");
        }

        console.log("File available at", downloadURL);
      });
    });
  };

  return (
    <>
      {activeInfo && (
        <div className="msgbox">
          <div className="activeChatData">
            {/* <Image src={activeInfo.activePic} className="activeChatImg" />
            <h4>{activeInfo.activeName}</h4> */}

            <>
              <Image src={activeInfo.activePic} className="activeChatImg" />
              <h4>{activeInfo.activeName}</h4>
            </>
          </div>
          <div className="containermsg">
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
                  </div>
                ) : (
                  <div className="receiveaudio">
                    <audio src={iteam.audio} controls></audio>
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
                  <h6 className="msgImgTime">
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
                  <h6 className="msgImgTime">
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
          {audio ? (
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
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={false}
                downloadFileExtension="webm"
              />

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
      )}
    </>
  );
};

export default Msg;
