import React, { useState, useEffect } from 'react';

function SelectUser(props) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from your server
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserSelection = (userId) => {
    // Toggle user selection
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  return (
    <div>
      <h2>Select Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>
              <input
                type="checkbox"
                value={user.id}
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelection(user.id)}
              />
              {user.username}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => props.onUsersSelected(selectedUsers)}>Done</button>
    </div>
  );
}

export default SelectUser;
