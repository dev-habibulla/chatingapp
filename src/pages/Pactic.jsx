import React, { useState } from 'react'
import Image from '../components/Image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bg from "../assets/login.png"
import googleLogin from "../assets/google_login.png"
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Pactic = () => {


    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [email, setEmail] = useState("")
    let [adress, setAdress] = useState("")

    let [open, setOpen] = useState(true);
  
  
    let handleNameChange =(e)=>{
        setName(e.target.value)
       
    }
    let handlePhoneChange =(e)=>{
        setPhone(e.target.value)
        
    }
    let handleEmailChange =(e)=>{
        setEmail(e.target.value)
        
    }
    let handleAddressChange =(e)=>{
        setAdress(e.target.value)
    }

  
    let handleLogin = () => {
        // window.print();
        setOpen(false)
    //   if (email && password) {
  
    //     console.log("all ok login");
  
    //   }
  
    };

    return (

        <div className='card'>
            
            {open
                        ?
                        <div className='testboxx'>
                        <TextField onChange={handleNameChange} name="name" className="inputcssstyle" type="text" id="outlined-basic" label="Full Name" variant="outlined" />
                        <TextField onChange={handlePhoneChange} name="phone" className="inputcssstyle" type="text" id="outlined-basic" label="Phone number" variant="outlined" />
                        <TextField onChange={handleEmailChange} name="email" className="inputcssstyle" type="email" id="outlined-basic" label="Email Address" variant="outlined" />
                        <TextField onChange={handleAddressChange} name="adress" className="inputcssstyle" type="text" id="outlined-basic" label="Address" variant="outlined" />
                    
                        <Button onClick={handleLogin} className="loginsbtn" variant="contained">Sign in</Button>
                    </div>
                        :
                        <div className="template">
                <div className="content">
                    <h6 className='name'>{email}</h6>
                    <h6 className='phone'>{phone}</h6>
                    <h6 className='email'>{email}</h6>
                    <h6 className='adress'>{adress}</h6>
                </div>

            </div>
                    }

        </div>


    )
}

export default Pactic
