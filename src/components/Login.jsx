import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { adduser } from '../utils/userslice';
import {  useNavigate } from 'react-router';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[firstName,setfirstName]=useState("");
  const[lastName,setlastName]=useState("");
const [ErrorMsg, setErrorMsg] = useState("");
const[islogin,setislogin]=useState("");
const dispatch=useDispatch();
const navigate=useNavigate();


const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      email: email.trim(),
      password,
    }, { withCredentials: true });
    dispatch(adduser(res.data));
    console.log(res.data);
    navigate("/feed");
   
    setErrorMsg(""); 
  } catch (err) {
    
    const msg = err.response?.data?.message || "Login failed";
    console.error("Login failed:", msg);
    setErrorMsg(msg);
  }
};

const handlesignup = async () => {
    try {
    const User = {
      firstName: firstName, // replace with actual value from form
      lastName: lastName,
      email: email,
      password: password,
    }
    
   
    const res = await axios.post("http://localhost:3000/auth/signup",User, { withCredentials: true });
    dispatch(adduser(res.data.data));
    navigate("/profile");
   
    setErrorMsg(""); 
  } catch (err) {
    
    const msg = err.response?.data?.message || "signup failed";
    console.error("signup failed:", msg);
    setErrorMsg(msg);
  }
};



  return (
    <div className="card card-border bg-info-content w-96 my-10 mx-auto shadow-xl">
      <div className="card-body">
        <h2 className="card-title"> {islogin?"login":"signup"}</h2>
         {!islogin &&<> <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">firstName:</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
        </div>
          <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">lastName:</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
        </div></>}
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId:</legend>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
        </div>

        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
        </div>
<p className="message text-red-500">{ErrorMsg}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={islogin?handleLogin:handlesignup}>
            {islogin?"login":"signup"}  </button>
        </div>
        <p className='m-auto cursor-pointer py-2' onClick={()=>setislogin((value)=>!value)}>{islogin?"New User? Signup Here":"Existing User? Login Here"}</p>
      </div>
    </div>
  );
};

export default Login;
