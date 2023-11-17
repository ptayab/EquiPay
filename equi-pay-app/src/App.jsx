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

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/user/:userId" element={<UserProfile />} />
                        <Route path="/user/:userId/dashboard" element={<UserProfile />} />
                        <Route path="/user/:userId/history" element={<History />} />
                        <Route path="/user/:userId/expenseList/group/:groupId" element={<ExpenseList />} />
                    </Routes>
                </Router>
            </UserProvider>
        </LocalizationProvider>
    );
}

export default App;
