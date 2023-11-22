import React from 'react';

import { useLocation } from 'react-router-dom';
const Remind = ({ groupName }) => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get('userEmail') || '';

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  };

  const formStyles = {
    width: '70%',
    background: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headerStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  };

  const descStyles = {
    fontSize: '18px',
    color: '#555',
    fontFamily: 'Arial, sans-serif', 
    backgroundColor: 'silver', 
    padding: '10px',
    width: "100%"
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const submitButtonStyles = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  };


    return (
      <div style={containerStyles}>
        <div>
          <h1 style={headerStyles}>Remind User in {groupName}</h1>
        </div>
        <div style={formStyles} id="contactusform">
          <form action="https://formsubmit.co/aroraaryan689@gmail.com" method="POST" id="contact-form">
            <input name="name" type="text" style={inputStyles} placeholder="Name" id="inputName" required />
            <input name="email" type="email" style={inputStyles} placeholder="Email" id="inputEmail" value={userEmail} required />
            <input
              name="message"
              type="text"
              style={inputStyles}
              placeholder={`Please pay your dues`}
              id="inputMessage"
              required
            />
            <input type="submit" style={submitButtonStyles} value="Send" id="buttonSubmit" />
          </form>
        </div>
      </div>
    );
  };

export default Remind;
