import React from 'react';

const Remind = () => {
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
    fontFamily: 'Arial, sans-serif', // Change the font family
    backgroundColor: 'silver', // Add a background color
    padding: '10px', // Add padding to highlight
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
      <h1 style={headerStyles}>Reminde User</h1>

      </div>

      <div style={formStyles} id="contactusform">
        <form action="https://formsubmit.co/aroraaryan689@gmail.com" method="POST" id="contact-form">
          
          <input name="name" type="text" style={inputStyles} placeholder="Name" id="inputName" required />
          <input type="submit" style={submitButtonStyles} value="Send" id="buttonSubmit" />
        </form>
      </div>
    </div>
  );
};

export default Remind;
