import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const Notifications = () => {
  const db = getDatabase();
  let [notiList, setNotiList] = useState([]);

  let userInfo = useSelector((state) => state.logedUser.value);



  useEffect(() => {
    const notificationtRef = ref(db, "notification");
    onValue(notificationtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if ((userInfo.uid == item.val().whoNotiReceverID)) {
          arr.push({ ...item.val() });
        }
      });
      setNotiList(arr);
    });
  }, []);





  return (
    <div className="notiBox">
      <input className="notiSearch" type="text" />
      Notifications
      {notiList.map((item) => (
        <p className="notiText">{item.whoNotiSenderName}  sent a {item.notiText}</p>
      ))}
    </div>
  );
};

export default Notifications;
