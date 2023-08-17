import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bg from "../assets/login.png"
import googleLogin from "../assets/google_login.png"
import Image from './../components/Image';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);


  let handleChange = (e) => {
    
    setEmail(e.target.value)
    setPassword(e.target.value)
   
    if (e.target.name == "email") {
      setEmailError("")
    }
    if (e.target.name == "password") {
      setPasswordError("")
    }

  };

  let handleLogin = () => {
    
    if (!email) {
      setEmailError("Email Required");
    }
    if (!password) {
      setPasswordError("Password Required");
    }


    if (email && password) {

      console.log("all ok login");

     let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!pattern.test(email)) {
        setEmailError("Invalid email")
      }

      if (!re.test(password)) {
        setPasswordError("Password must be at least 8 characters long and should include a combination of uppercase letters, lowercase letters, numbers, and symbols.")
      }

    }

  };



  return (
    <div className="login">
    <div className="left">
      <div className="text_container">
        <h2>Login to your account!</h2>
        <Link to="/">
        <Image src={googleLogin} className="googleLogin"/>
        </Link>
        

    
        <TextField onChange={handleChange} name="email" className="inputcss" type="email" id="outlined-basic" label="Email Address" variant="outlined" />
        {emailError && <Alert className="alert" variant="filled" severity="error"> {emailError} </Alert>}
        <div>
            <TextField onChange={handleChange} name="password" className="inputcss" type={open ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined"
            />

            {open
              ?
              <AiFillEye onClick={() => setOpen(false)} className="eye" />
              :
              <AiFillEyeInvisible onClick={() => setOpen(true)} className="eye" />
            }
             {passwordError && <Alert className="alert" severity="warning"> {passwordError} </Alert>}
             


          </div>

        <Button onClick={handleLogin} className="loginbtn" variant="contained">Sign in</Button>
        <p>Don’t have an account ? <Link to="/" className="focus">Sign up</Link></p>
      </div>
    </div>

    <div className="right">
      <Image src={bg} className="bg" />
    </div>
  </div>
  )
}

export default Login
