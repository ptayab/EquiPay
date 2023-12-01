import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Context 
import { UserProvider } from "./context/profile.hook"

// Component
import Header from './components/common/Header';


// Page Routes
import UserList from './pages/UserList';
import Login from './pages/login';
import Register from './pages/register';
import UserProfile from './pages/UserProfile';
import Contact from './pages/contactForm';
import History from './pages/history.jsx';
import ExpenseList from './components/home/Expenselist.jsx';
import UserReminder from './components/home/RemindUser.jsx';


function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Provides Global User State Context */}
            <UserProvider>
                <Router>
                    <Header />

                    <Routes>               
                        {/* Route for User List (Displayed on the first page) */}
                        <Route path="/"                 element={<UserList />} />
                        <Route path="/login"            element={<Login />} />
                        <Route path="/register"         element={<Register />} />
                        <Route path="/contact"          element={<Contact />} />
                        <Route path="/user/:userId/*"   element={<UserProfile />}>
                            <Route path="dashboard"         element={<UserProfile />} />
                        </Route>
                        <Route path="/user/:userId/history" element={<History />} />

                        <Route path="/user/:userId/expenseList/group/:groupId" element={<ExpenseList />} />
                        <Route path="/user/:userId/expenseList/group/:groupId/RemindUser/:userEmail" element={<UserReminder/>} />
                    </Routes>
                </Router>
            </UserProvider>
        </LocalizationProvider>
    );
}
export default App;
