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
        
                    </Routes>
                </Router>
            </UserProvider>
        </LocalizationProvider>
    );
}
export default App;

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
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './login';
// import Register from './register';
// import UserProfile from './UserProfile';
// import Header from './common/Header';
// import Home from './home/home';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import ContactForm from './home/contactForm';
// import UserList from './UserList';

// function App() {
//   const [contactFormRoute, setContactFormRoute] = useState(null);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Router>
//         <Header setContactFormRoute={setContactFormRoute} />
//         <Routes>
//           <Route path="/" element={<UserList />} />
//           <Route path="/user/:userId" element={<UserProfile />} />
//           <Route path="/user/:userId/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/contact" element={<ContactForm />} />

//           {/* Add more routes for user profiles, expense forms, etc. */}
//         </Routes>
//       </Router>
//     </LocalizationProvider>
//   );
// }

// export default App;