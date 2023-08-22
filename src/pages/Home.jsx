import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
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
