import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bg from "../assets/registration.png";
import Image from "./../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Registation = () => {

  const auth = getAuth();
  let navigate = useNavigate()

  let [fromData, setFromData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  let [fullNameError, setFullNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);
  let [load, setLoad] = useState(false);


  let handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,

    });
    setFullNameError("")
    setEmailError("")
    setPasswordError("")
    // if (e.target.name == "fullName") {
    //   setFullNameError("")
    // }
    // if (e.target.name == "email") {
    //   setEmailError("")
    // }
    // if (e.target.name == "password") {
    //   setPasswordError("")
    // }
  }



  let handleRegistrastion = () => {
    if (!fromData.fullName) {
      setFullNameError("Full name Required");
    }
    if (!fromData.email) {
      setEmailError("Email Required");
    }
    if (!fromData.password) {
      setPasswordError("Password Required");
    }

    if (fromData.fullName && fromData.email && fromData.password) {
      let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (fromData.fullName.length < 3) {
        setFullNameError("Full Name must be 3 character");
      }

      if (!emailPattern.test(fromData.email)) {
        setEmailError("Invalid email")
      }

      if (!passwordPattern.test(fromData.password)) {
        setPasswordError("Password must be at least 8 characters long and should include a combination of uppercase letters, lowercase letters, numbers, and symbols."
        )
      }
      setLoad(true)
      createUserWithEmailAndPassword(auth, fromData.email, fromData.password).then(
        () => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setFromData({
                fullName: "",
                email: "",
                password: "",
              })
              setLoad(false)
              toast.success('Registration Successful please verify your email', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              setTimeout(() => {
                navigate("/login")
              }, 1000);
            });

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("email")) {

            toast.error('Email already exists!', {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          };
          setLoad(false)
        });

    }

  }


  return (
    <div className="registration">
      <div className="left">
        <div className="text_container">
          <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>

          <TextField onChange={handleChange} name="fullName" className="inputcss" type="text" id="outlined-basic" label="Fulname" variant="outlined" value={fromData.fullName}
          />
          {fullNameError && <Alert className="alert" variant="filled" severity="error"> {fullNameError} </Alert>}

          <TextField onChange={handleChange} name="email" className="inputcss" type="email" id="outlined-basic" label="Email Address" variant="outlined" value={fromData.email}
          />
          {emailError && <Alert className="alert" variant="filled" severity="error"> {emailError} </Alert>}

          <div>
            <TextField onChange={handleChange} name="password" className="inputcss" type={open ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" value={fromData.password}
            />

            {open
              ?
              <AiFillEye onClick={() => setOpen(false)} className="eye" />
              :
              <AiFillEyeInvisible onClick={() => setOpen(true)} className="eye" />
            }
            {passwordError && <Alert className="alert" variant="filled" severity="error"> {passwordError} </Alert>}

          </div>
          {load
            ?
            <Button className="regbtn" variant="contained">
              <RotatingLines
                strokeColor="white"
                strokeWidth="3"
                animationDuration="0.75"
                width="25"
                visible={true}
              />
            </Button>
            :
            <Button onClick={handleRegistrastion} className="regbtn" variant="contained" > Sign up </Button>
          }

          <p> Alredy have an account ? <Link to="/login" className="focus"> Sign in </Link> </p>
        </div>
      </div>
      <div className="right">
        <Image src={bg} className="bg" />
      </div>
    </div>
  )
}

export default Registation