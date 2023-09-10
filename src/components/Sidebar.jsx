import React, { useState } from "react";
import Image from "./Image";
import {
  AiFillHome,
  AiFillMessage,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { logedUser } from "../slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.logedUser.value);

  let [url, setUrl] = useState("");

  let handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("Sign-out successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        dispatch(logedUser(null));
        localStorage.removeItem("user");
        navigate("/login");
      }, 1000);
    });
  };

  return (
    <div className="sidebar">
      <Image className="sidebarimg" src={userInfo?.photoURL} />
      <h1>{userInfo?.displayName}</h1>
      <ul>
        <li
          onClick={() => setUrl("home")}
          className={url == "home" && "active"}
        >
          <Link to="home">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li
          onClick={() => setUrl("message")}
          className={url == "message" && "active"}
        >
          <Link to="/message">
            <AiFillMessage className="icon" />
          </Link>
        </li>
        <li
          onClick={() => setUrl("notifications")}
          className={url == "notifications" && "active"}
        >
          <Link to="/notifications">
            <IoMdNotificationsOutline className="icon" />
          </Link>
        </li>
        <li
          onClick={() => setUrl("setting")}
          className={url == "setting" && "active"}
        >
          <Link to="/setting">
            <AiFillSetting className="icon" />
          </Link>
        </li>
        <li>
          <Button onClick={handleLogout}>
            <AiOutlineLogout className="logouticon" />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
