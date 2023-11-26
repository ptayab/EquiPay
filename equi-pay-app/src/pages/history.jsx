import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Paper, useTheme, Button } from '@mui/material';
import * as Fetch from "../lib/fetch"; // Adjust the import path as necessary

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function History() {
  const { userId } = useParams();
  const navigate = useNavigate(); // Hook to navigate to different routes
  const theme = useTheme();
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Fetch expenses for the user
        const expensesResponse = await Fetch.get("expenses", { user_id: userId });
        // Fetch all groups to get names and colors
        const groupsResponse = await Fetch.get("groups");

        // Create a mapping of group IDs to group details
        const groupDetails = {};
        groupsResponse.forEach(group => {
          groupDetails[group.id] = {
            name: group.name,
            color: getGroupColor(group.id), // Define a method to map group IDs to colors
          };
        });

        // Extract the data needed for the chart
        const labels = expensesResponse.map(expense => new Date(expense.created_at).toLocaleDateString());
        const data = expensesResponse.map(expense => expense.balance);
        const backgroundColor = expensesResponse.map(expense => groupDetails[expense.group_id]?.color || theme.palette.grey[400]); // Fallback to a default color
        const groupNames = expensesResponse.map(expense => groupDetails[expense.group_id]?.name || 'Unknown');

        // Set the chart data
        setExpensesData({
          labels,
          datasets: [{
            label: 'Expenses by Group',
            data,
            backgroundColor,
            groupNames, // Used for the chart's legend
          }],
        });
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId, theme.palette.grey]);

  // Define a function to map group_id to a color
  const getGroupColor = (groupId) => {
    // Define your color mapping logic here
    // This should be in sync with whatever method you're using to assign colors to groups
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // Example color array
    return colors[groupId % colors.length]; // Adjust as needed for your group IDs
  };

  // Options for the chart, including a custom legend
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          // Generate unique legend labels
          generateLabels: (chart) => {
            const labelsSet = new Set();
            const uniqueLabels = [];
  
            chart.data.datasets.forEach((dataset) => {
              dataset.groupNames.forEach((groupName, index) => {
                if (!labelsSet.has(groupName)) {
                  labelsSet.add(groupName);
                  uniqueLabels.push({
                    text: groupName,
                    fillStyle: dataset.backgroundColor[index],
                  });
                }
              });
            });
  
            return uniqueLabels;
          },
        },
      },
    },
  };  
  const handleBackToDashboard = () => {
    navigate(`/user/${userId}`); // Navigate to the user's dashboard route
  };

  return (
    <Paper style={{ padding: theme.spacing(3), marginTop: theme.spacing(3)}}>
        <Typography variant="h4" component="h1" gutterBottom align='center'>
          History Graph UserID: {userId}
        </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        align='center'
        onClick={handleBackToDashboard}
        style={{ marginBottom: theme.spacing(2) }} // Add some spacing below the button
      >
        Back to Dashboard
      </Button>

      <div style={{ height: '400px' }}>
        <Bar data={expensesData} options={options} />
      </div>
    </Paper>
  );
}

export default History;