import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logedUser } from "../slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import GroupList from "../components/GroupList";
import Friends from './../components/Friends';
import UserList from './../components/UserList';
import FriendRequest from "../components/FriendRequest";
import MyGroups from './../components/MyGroups';
import BlockedUsers from './../components/BlockedUsers';



const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((stade) => stade.logedUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  let handleLogOut = () => {
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
    <div>
    <Grid container spacing={2}>
        <Grid item xs={4}>
          <GroupList/>
        </Grid>
        <Grid item xs={4}>
        <Friends/>
        </Grid>
        <Grid item xs={4}>
        <UserList/>
        </Grid>
        <Grid item xs={4}>
        <FriendRequest/>
        </Grid>
        <Grid item xs={4}>
        <MyGroups/>
        </Grid>
        <Grid item xs={4}>
        <BlockedUsers/>
        </Grid>
      </Grid>
      <Button onClick={handleLogOut} variant="contained">
        Logout
      </Button>
    </div>
  );
};

export default Home;
