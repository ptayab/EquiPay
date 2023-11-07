import React from 'react';
import Home from './home/home';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h2>User Dashboard for User ID: {userId}</h2>

      <Home />
    </div>
  );
}

export default UserProfile;