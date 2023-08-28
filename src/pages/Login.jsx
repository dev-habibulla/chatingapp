import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bg from "../assets/login.png";
import googleLogin from "../assets/google_login.png";
import fbLogin from "../assets/fb_login.png";
import Image from "./../components/Image";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider ,
} from "firebase/auth";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const auth = getAuth();
  // const provider = new GoogleAuthProvider();
  const provider = new FacebookAuthProvider();

  let navigate = useNavigate();
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);
  let [load, setLoad] = useState(false);

  let [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    setEmailError("");
    setPasswordError("");
    // if (e.target.name == "fullName") {
    //   setFullNameError("")
    // }
    // if (e.target.name == "email") {
    //   setEmailError("")
    // }
    // if (e.target.name == "password") {
    //   setPasswordError("")
    // }
  };


  let handlefbLogin =()=>{

    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
  
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });



  }



  // let handleGoogleLogin =()=>{

  // signInWithPopup(auth, provider)
  // .then((result) => {
  //   setTimeout(() => {
  //     navigate("/home");
  //   }, 1000);
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

  // }

  let handleLogin = () => {
    setLoad(true);

    if (!fromData.email) {
      setLoad(false);
      setEmailError("Email Required");
    }
    if (!fromData.password) {
      setLoad(false);
      setPasswordError("Password Required");
    }

    if (fromData.email && fromData.password) {
      // let emailPattern =
      //   /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      // if (!emailPattern.test(fromData.email)) {
      //   setLoad(false);
      //   setEmailError("Invalid email");
      // }
      signInWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then((user) => {
          // console.log(user.user.emailVerified);
          if (user.user.emailVerified) {
            toast("Login Successful");
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          } else {
            toast.error("Please Verify Your Email", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setLoad(false);
          }
          setLoad(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;

          if (errorCode.includes("wrong-password")) {
            toast.error("Wrong Password", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          if (errorCode.includes("user-not-found")) {
            toast.error("Email Not Found", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          setLoad(false);
        });
    }
  };

  return (
    <div className="login">
      <div className="left">
        <div className="text_container">
          <h2>Login to your account!</h2>
          {/* <Button onClick={handleGoogleLogin}>
            <Image src={googleLogin} className="googleLogin" />
          </Button> */}
          <Button onClick={handlefbLogin}>
            <Image src={fbLogin} className="fbLogin" />
          </Button>

          <TextField
            onChange={handleChange}
            name="email"
            className="inputcss"
            type="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
          {emailError && (
            <Alert className="alert" variant="filled" severity="error">
              {" "}
              {emailError}{" "}
            </Alert>
          )}
          <div>
            <TextField
              onChange={handleChange}
              name="password"
              className="inputcss"
              type={open ? "text" : "password"}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />

            {open ? (
              <AiFillEye onClick={() => setOpen(false)} className="eye" />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setOpen(true)}
                className="eye"
              />
            )}
            {passwordError && (
              <Alert className="alert" severity="warning">
                {" "}
                {passwordError}{" "}
              </Alert>
            )}
          </div>
          {load ? (
            <Button className="loginbtn" variant="contained">
              <RotatingLines
                strokeColor="white"
                strokeWidth="3"
                animationDuration="0.75"
                width="25"
                visible={true}
              />
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              className="loginbtn"
              variant="contained"
            >
              Sign in
            </Button>
          )}
          <p>
            Don’t have an account ?{" "}
            <Link to="/" className="focus">
              Sign up
            </Link>
          </p>
          <p>
            Forget Password{" "}
            <Link to="/forgotpassword" className="focus">
              Click here
            </Link>
          </p>
        </div>
      </div>

      <div className="right">
        <Image src={bg} className="bg" />
      </div>
    </div>
  );
};

export default Login;
