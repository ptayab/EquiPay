import React, { Component } from 'react';
import {useState} from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Register = ({set}) => {

const [usernameReg, setUsernameReg] = useState('');
const [passwordReg, setPasswordReg]= useState('');
const nav = useNavigate();

const register = () => {
Axios.post("http://localhost:8080/register",{
username: usernameReg,
password: passwordReg,
}).then((response) => {
console.log(response);
nav("/login");
});
};

return(
<div className="App">
<div className='Log-In'>
<h1>Registration</h1><br />
<label>Username</label>
<input
required type = "text"
onChange= { (e) => {
setUsernameReg(e.target.value);
}
}
/><br/>
<label>password</label>
<input
required type = "password"
onChange= { (e) => {
setPasswordReg(e.target.value);
}
}
/><br />
<button onClick={register}>Register</button><br/>
<span>Already Registered? <Link to="/login">Login</Link></span><br/>
</div>
</div>
)
}

export default Register;