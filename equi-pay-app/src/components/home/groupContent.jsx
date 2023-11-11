import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Grid, Paper} from "@mui/material";
import Groups from "./Groups";
import Friends from "./Friends";
import CreateExpense from "./CreateExpense";
import NeedToPayFees from "./Expenselist";


const GroupContent = () => {
  const { groupId } = useParams();
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [gname, setgname] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/groups/${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersInGroup(data.data);
      })
      .catch((error) => {
        console.error('Error fetching users in group:', error);
      });
  }, [groupId]);


  useEffect(() => {
    // Fetch users in the group based on groupId
    fetch(`http://localhost:3000/api/groupName/${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        setgname(data.groupName);
      })
      .catch((error) => {
        console.error('Error fetching users in group:', error);
      });
  }, [groupId]);

  return (
    <div>
    <div>
      <h2>Users in Group {gname}</h2>
      <ul>
        {usersInGroup.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
    <div>
    <Grid item xs={3}>
                        <Friends />
                    </Grid>
                    <Grid item xs={6}>
                        <NeedToPayFees />
                    </Grid>
    </div>
    </div>
  );
};

export default GroupContent;
