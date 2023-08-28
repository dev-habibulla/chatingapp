import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let handleLogOut = () => {
    signOut(auth).then(() => {
  
      toast.success('Sign-out successful', {
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
