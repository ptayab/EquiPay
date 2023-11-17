
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
function Header() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link> 
        </li>
        {/* <li>
          <Link to="/about">About</Link> 
        </li>
        <li>
          <Link to="/services">Services</Link> 
        </li> */}
        <li>
          <Link to="/contact">Contact</Link> 
        </li>

        <li>
          <Link to="/">Select User</Link> 
        </li>

        <li>
          <Link to="/register">Register</Link> 
        </li>
        <li>
          <Link to="/history">History</Link> 
        </li>
      </ul>
      <h1>Equipay</h1>
    </nav>
  );
}

export default Header;


