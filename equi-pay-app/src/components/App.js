import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserList from './UserList';
import UserProfile from './UserProfile'; // Create this component
import GroupExpenses from "./group_expenses.jsx";
import { useState } from "react";

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