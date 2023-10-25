import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userList.css'

function UserList() {
  const sampleUsers = [
    { id: 1, username: 'BobTheBuilder', password: 'Bob' },
    { id: 2, username: 'VacationVince', password: 'vince' },
    { id: 3, username: 'RoomateRandy', password: 'randy' },
    { id: 4, username: 'DineOutDale', password: 'dale' },
    { id: 5, username: 'SteezySki', password: 'ski' },
    { id: 6, username: 'CollegeCorey', password: 'corey' },
  ];

  const [users, setUsers] = useState(sampleUsers);

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}` }state={{ user: user }}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;