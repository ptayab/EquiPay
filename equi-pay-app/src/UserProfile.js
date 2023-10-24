import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  console.log(userId);

  const [likes, setLikes] = useState(0);

  useEffect(() => {
    
  }, [userId]);



    const location = useLocation();
    const user  = location.state.user;
    console.log(user);
    const username  = location.state.user.username;

    console.log(username);
  
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {userId}</p>
      <p>Username: {username}</p>
    </div>
  );
}

export default UserProfile;