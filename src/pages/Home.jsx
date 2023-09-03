import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logedUser } from "../slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

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
        dispatch(logedUser(null))
        localStorage.removeItem("user")
        navigate("/login");
      }, 1000);
    });
  };

  return (
    <div>
      <Button onClick={handleLogOut} variant="contained">
        Logout{" "}
      </Button>
    </div>
  );
};

export default Home;
