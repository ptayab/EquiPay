import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from "@mui/material";
import Groups from "../components/home/Groups";
import Friends from "../components/home/Friends";
import NeedToPayFees from "../components/home/NeedPayList";
import { useParams } from 'react-router-dom';
import * as fetch from "../lib/fetch";
import History from './History'; // Import the History component

function UserProfile() {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [profileStatus, setProfileStatus] = useState({
    id: userId,
    name: "",
    group: "*",
    expense: null,
    member: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch.get("users", { id: userId });
        setUsername(data[0].displayname);
        // Optionally update profileStatus based on fetched data
        // setProfileStatus({ ...profileStatus, name: data[0].name /* other properties */ });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [userId]);

  const toggleHistory = () => {
    setShowHistory(!showHistory); // Toggle the display of the history component
  };

  return (
    <Container maxWidth="xl">
      <h2 className='py-4 ml-6 text-4xl font-extrabold'>User Dashboard for User ID: {username}</h2>
      <button onClick={toggleHistory}>
        {showHistory ? 'Back to Profile' : 'View Expense History'}
      </button>
      {showHistory ? (
        <History />
      ) : (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Groups callback={{ profileStatus, setProfileStatus }} />
            </Grid>
            <Grid item xs={6}>
              <NeedToPayFees callback={{ profileStatus, setProfileStatus }} />
            </Grid>
            <Grid item xs={3}>
              <Friends callback={{ profileStatus, setProfileStatus }} />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}

export default UserProfile;
