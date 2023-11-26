import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Button, Typography, Box } from "@mui/material";
import Groups from "../components/home/Groups";
import Friends from "../components/home/Friends";
import NeedToPayFees from "../components/home/NeedPayList";
import { useParams, useNavigate } from 'react-router-dom';
import * as fetch from "../lib/fetch";

function UserProfile() {
  const { userId } = useParams();
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const [profileStatus, setProfileStatus] = useState({
    id: userId,
    name: "",
    group: "*",
    expense: null,
    member: null
  });

  const goToHistory = () => {
    navigate(`/user/${userId}/history`);
  };  

  useEffect(() => {
    async function fetchData() {
        try {
            const data = await fetch.get("users",{ id: userId});
            setUsername(data[0].displayname)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchData();
  }, [userId]);

  return (
    <Container maxWidth="xl">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Current User ID: {username}
        </Typography>
        <Button variant="contained" color="primary" onClick={goToHistory} size="large">
          View Expense History
        </Button>
      </Box>
      <Paper elevation={2} style={{ padding: '20px', marginTop: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Groups callback={{ profileStatus, setProfileStatus }} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserProfile;
