import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("")

  let handleForgotPasword =()=>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
   
      console.log("Password reset email sent successful");
      toast("Password reset email sent successful");
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode.includes("user-not-found")) {
        console.log("Email Not Found");
        toast.error("Email Not Found", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  }

  return (
    <div className="forgotpage">
      <div className="forgotbox">
        <h3>Forgot Password</h3>
      <TextField onChange={(e)=>setEmail(e.target.value)} className="forgot-inputbox" id="outlined-basic" label="Email" variant="outlined" />
      <br />
      <Button onClick={handleForgotPasword} variant="contained">Submit</Button>
      </div>
    </div>
  )
}

export default ForgotPassword
