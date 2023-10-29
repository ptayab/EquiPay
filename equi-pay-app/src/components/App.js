import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserList from './UserList';
import UserProfile from './UserProfile'; // Create this component
import Header from "./common/Header";
import Home from "./home";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Router>

                <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {/* Add more routes for user profiles, expense forms, etc. */}
                </Routes>


        </Router>
        </LocalizationProvider>
    );
}

export default App;