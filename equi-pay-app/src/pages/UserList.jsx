import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as fetch from "./../lib/fetch"


const sampleUsers = [
    { id: 1, displayname: 'BobTheBuilder', password: 'Bob' },
    { id: 2, displayname: 'VacationVince', password: 'vince' },
    { id: 3, displayname: 'RoomateRandy', password: 'randy' },
    { id: 4, displayname: 'DineOutDale', password: 'dale' },
    { id: 5, displayname: 'SteezySki', password: 'ski' },
    { id: 6, displayname: 'CollegeCorey', password: 'corey' },
];


function UserList() {
    const [users, setUsers] = useState(sampleUsers);

    useEffect(() => {
            const sortData = (list, field) => {
                return [...list].sort((a, b) => {
                const fieldA = String(a[field]).toLowerCase();
                const fieldB = String(b[field]).toLowerCase();
        
                if (fieldA < fieldB) return -1;
                if (fieldA > fieldB) return 1;
                return 0;
                });
            };

            async function fetchData() {
                try {
                    const data = await fetch.get("users");
                    setUsers(sortData(data, 'displayname'));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, []);
        
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '80vh' }}>
        <style> {
            `.user-list {
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
              }`
        } </style>
        <h1 className="user-list-heading">User List</h1>
        <ul className="user-list">
            {users.map((user) => (
            <li key={user.id}>
                <Link 
                    to={`/user/${user.id}`} 
                    state={{ user: user }}
                >
                    {user.displayname}
                </Link>
            </li>
             ))}

        </ul>
        </div>
    );
}

export default UserList;
