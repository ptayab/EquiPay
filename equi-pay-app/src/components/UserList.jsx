import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '80vh' }}>
      <style>
        {`
          .user-list {
            list-style: none;
            padding: 0;
          }

          .user-list li {
            margin: 10px 0;
            font-size: 24px; /* Increase the font size for larger text */
          }

          .user-list a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            font-family: 'inherit'; /* Use the same font as the links */
            transition: color 0.3s;
          }

          .user-list a:hover {
            color: #0056b3;
          }
        `}
      </style>
      <h1 className="user-list-heading">User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`} state={{ user: user }}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
