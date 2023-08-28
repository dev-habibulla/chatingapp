import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bg from "../assets/registration.png";
import Image from "./../components/Image";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Registration = () => {
  const auth = getAuth();

  // let [fullName, setFullName] = useState("")
  // let [email, setEmail] = useState("")
  // let [password, setPassword] = useState("")

  let [fromData, setFromData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  let [fullNameError, setFullNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);

  let handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "fullName") {
      setFullNameError("")
    }
    if (e.target.name == "email") {
      setEmailError("")
    }
    if (e.target.name == "password") {
      setPasswordError("")
    }

  };

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

      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!pattern.test(fromData.email)) {
        setEmailError("Invalid email")
      }

      if (fromData.fullName.length >3) {
        fullNameError("Full Name must be 3 character")
      }

      if (!re.test(fromData.password)) {
        setPasswordError("password not stong")
      }

    }

  };

  return (
    <div className="registration">
      <div className="left">
        <div className="text_container">
          <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>
          
          <TextField onChange={handleChange} name="fullName" className="inputcss" type="text" id="outlined-basic" label="Fulname" variant="outlined"
          />

          {fullNameError && <Alert variant="filled" severity="error"> {fullNameError} </Alert>}

          <TextField onChange={handleChange} name="email" className="inputcss" type="email" id="outlined-basic" label="Email Address" variant="outlined"
          />
          {emailError && <Alert variant="filled" severity="error"> {emailError} </Alert>}

          <div>
            <TextField onChange={handleChange} name="password" className="inputcss" type={open ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined"
            />

            {open
              ?
              <AiFillEye onClick={() => setOpen(false)} className="eye" />
              :
              <AiFillEyeInvisible onClick={() => setOpen(true)} className="eye" />
            }
             {passwordError && <Alert variant="filled" severity="error"> {passwordError} </Alert>}

          </div>

          <Button onClick={handleRegistrastion} className="regbtn" variant="contained" > Sign up </Button>

          <p> Alredy have an account ? <Link to="/login" className="focus"> Sign in </Link> </p>
        </div>
      </div>
      <div className="right">
        <Image src={bg} className="bg" />
      </div>
    </div>
  );
};

export default Registration;
