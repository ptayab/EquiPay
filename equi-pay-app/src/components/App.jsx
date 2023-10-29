
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserList from './UserList';
import UserProfile from './UserProfile'; // Create this component
import GroupExpenses from "./group_expenses.jsx";
import { useState } from "react";
import SettleUp from './SettleUp';

function App() {





  // Use this as global group
  let [group, setGroup] = useState({
    name: "Expenses",
    balance: 0,
    users: [],
    activeUser: "",
    expenses: [],
    usersMinusActive: {
      users: [],
      outstandingBalance: 0,
    },
  });


  return (
    <Router>
      <h1 className="title">Equipay</h1>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <>
  <Link to="/register"><button className="show-posts-button">Register</button></Link>
  <Link to="/login"><button className="add-posts-button">Login</button></Link>
  
</>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/SettleUp" element={<SettleUp/>}/>
          {/* Add more routes for user profiles, expense forms, etc. */}
        </Routes>
        <>b</>
      </div>
        
    </Router>
  );
  }
export default App;