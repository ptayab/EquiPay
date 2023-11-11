import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const GroupManager = () => {
  const { userId } = useParams();
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  console.log(userId);


  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const fetchGroups = () => {
    axios.get(`http://localhost:3000/api/getGroups/${userId}`, {userId: userId})
      .then((response) => {
        setGroups(response.data.data || []); // Ensure groups is initialized as an array
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleUserSelection = (user) => {
    const updatedSelectedUsers = [...selectedUsers];
    if (updatedSelectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      updatedSelectedUsers.splice(
        updatedSelectedUsers.findIndex((selectedUser) => selectedUser.id === user.id),
        1
      );
    } else {
      updatedSelectedUsers.push(user);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleGroupCreation = () => {
    axios.post('http://localhost:3000/api/groups', {
      groupName: groupName,
      members: selectedUsers.map((user) => user.id),
    })
      .then(() => {
        fetchGroups();
        setGroupName('');
        setSelectedUsers([]);
      })
      .catch((error) => {
        console.error('Error creating the group:', error);
      });
  };

  return (
    <div>
    <div className="create-group-form">
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <div>
        <h3>Select Users:</h3>
        {users.map((user) => (
          <div key={user.id}>
            <input
              type="checkbox"
              checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
              onChange={() => handleUserSelection(user)}
            />
            {user.username}
          </div>
        ))}
      </div>
      <button onClick={handleGroupCreation}>Create Group</button>
    </div>
            <br></br>
            <br></br>
            <br></br>
    <div className="created-groups-list">
      <h3>Your Groups:</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link to={{
                pathname:`/groups/${group.id}`,
                state : {  userId: userId
                }}}>
              {group.groupName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default GroupManager;
