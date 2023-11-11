import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserProfile from './UserProfile';
import Header from './common/Header';
import UserList from './UserList';
import Home from './home/home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ContactForm from './home/contactForm';
import GroupManager from './home/Groups';
import GroupContent from './home/groupContent';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Header />
        <Routes>
          {/* Route for User List (Displayed on the first page) */}
          <Route path="/" element={<UserList />} />

          <Route path="/user/:userId/*" element={<UserProfile />}>
            {/* Nested route for the User Dashboard */}
            <Route path="dashboard" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/group/:userId" element={<GroupManager />} />
          <Route path="/groups/:groupId" element={<GroupContent />} />


          {/* Add more routes for other components as needed */}
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;

