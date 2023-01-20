import React, { useRef } from 'react';
import "./login.css"
import {Cancel, Room} from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";


export default function Login ({setShowLogin}) {

  const nameRef=useRef();
  const passwordRef=useRef();
  const [error,setError]=useState(false);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const user={
      username:nameRef.current.value,
      password:passwordRef.current.value,
    };
    try{
      await axios.post("/users/login",user);
      setError(false);
    }catch(err){
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className="loginContainer">
        <div className="logo">
            <Room/>
            PinLocation
        </div>    
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button className="loginBtn">Login</button>
            {error && ( <span className="failure">Something went wrong!</span>)}
          </form> 
          <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
        
    </div>
  )
}
