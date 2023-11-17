import React, { useState, useEffect } from 'react';

import {Container, Grid, Paper} from "@mui/material";
import Groups from "../components/home/Groups";
import Friends from "../components/home/Friends";
import NeedToPayFees from "../components/home/NeedPayList";
import { useParams, useNavigate } from 'react-router-dom';
import * as fetch from "../lib/fetch"

function UserProfile() {
  const { userId } = useParams();
  const [username, setUsername] = useState()
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
            console.log("DATA",data)
            setUsername(data[0].displayname)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchData();
}, [userId]);

return (
    <div>
      <h2 className='py-4 ml-6 text-4xl font-extrabold'>User Dashboard for User ID: {username}</h2>
      <button onClick={goToHistory}>View Expense History</button> {/* Add this line */}
      <Container maxWidth="xl">
        <Paper elevation={2} style={{
            padding: '20px',
            marginTop: '10px'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Groups callback={{profileStatus, setProfileStatus}} />
                </Grid>
                <Grid item xs={6}>
                    <NeedToPayFees callback={{profileStatus, setProfileStatus}} />
                </Grid>
                <Grid item xs={3}>
                    <Friends callback={{profileStatus, setProfileStatus}} />
                </Grid>
            </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default UserProfile;