import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './userList.css'; // Import your CSS file with styles

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the user data when the component mounts
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        setUsers(response.data); // Set the user list in your state
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  }, []);


  return (
    <div className="user-list-container">
      <h1 className="user-list-heading">User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`} state={{ user: user }}>
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;


