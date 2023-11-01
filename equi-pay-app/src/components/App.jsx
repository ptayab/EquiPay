// import React from 'react';
// import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
// import Login from './login';
// import Register from './register';
// import UserList from './UserList';
// import UserProfile from './UserProfile'; // Create this component
// import Header from "./common/Header";
// import Home from "./home/home";
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import ContactForm from './home/contactUsForm';
// function App() {


//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>

//         <Router>

//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<Home />}/>
//                     <Route path="/user/:userId" element={<UserProfile/>}/>
//                     <Route path="/login" element={<Login/>}/>
//                     <Route path="/register" element={<Register/>}/>
//                     <Route path="/contact" element={<ContactForm />} /> {'./home/contactUsForm'}
//                     {/* Add more routes for user profiles, expense forms, etc. */}
//                 </Routes>


//         </Router>
//         </LocalizationProvider>
//     );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import UserProfile from './UserProfile';
import Header from './common/Header';
import Home from './home/home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ContactForm from './home/contactForm';

function App() {
  const [contactFormRoute, setContactFormRoute] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Header setContactFormRoute={setContactFormRoute} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactForm />} />

          {/* Add more routes for user profiles, expense forms, etc. */}
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
