import React, { Component } from 'react';
import {useState} from 'react';
import Axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { Home } from './Home';
//import './Login.css'

export const Login = ({set}) => {
const [user, setUser] = useState(null);

const [username, setUsername] = useState('');
const [password, setPassword]= useState('');

const [LoginStatus, setLoginStatus]= useState('');
const [loggedIn, setLoggedIn] = useState('');

const nav = useNavigate();

const login = () => {
Axios.post("http://localhost:8080/login",{
username: username,
password: password,
}).then((response) => {   

if(response.status == 200 && response.data.user){
console.log(response.data.user);
setLoggedIn("true");
setUser(response.data.user);
//nav('/home', { state: { user: response.data.user } });
setLoginStatus("success")

}
else{

console.log(response)
setLoggedIn("false");
console.log("Wrong  username / password")
setLoginStatus("Wrong username / password! Please try again")
}

});
};

return(
    <div className="App">

<div className='Log-In'>
                <h1>Log In</h1>
                <label>Username</label>
                <input
                    required type = "text"
                    onChange= { (e) => {
                        setUsername(e.target.value);
                    }
                    }
                    /><br/>
                <label>password</label>
                <input
                    required type = "password"
                    onChange= { (e) => {
                        setPassword(e.target.value);
                    }
                    }
                    /><br/>
                <button onClick={login}>Log In</button><br/>
                <span>Create account? <Link to="/register">Register</Link></span>
            </div>
            <p>{ LoginStatus }</p>
    </div>
)
};

export default Login;