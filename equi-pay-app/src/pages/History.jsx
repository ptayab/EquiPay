import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Paper, useTheme, Button, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as Fetch from "../lib/fetch"; // Adjust the import path as necessary

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function History() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });
  const [individualExpenses, setIndividualExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesResponse = await Fetch.get("expenses", { user_id: userId });
        const labels = expensesResponse.map(expense => expense.name); // Use expense name for labels

        // Map each expense to its own dataset
        const datasets = expensesResponse.map((expense, index) => ({
          label: expense.name,
          data: [expense.balance], // Wrap in array to make it a dataset
          backgroundColor: getGroupColor(index), // Call to a function to get a color based on index
        }));

        setExpensesData({
          labels,
          datasets,
        });

        setIndividualExpenses(expensesResponse);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [userId, theme]);

  const getGroupColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#A63EC5', '#00B2A9']; // More colors for more expenses
    return colors[index % colors.length]; // Cycle through colors for each expense
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          offset: false // Adjust this to false if you have few data points
        },
        barPercentage: 0.5, // You can experiment with this value
        categoryPercentage: 1 // Setting this to 1 to ensure the bars use the full width of the category
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5]
        }
      }
    },   
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 20,
          color: theme.palette.text.primary,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };
  
  const handleBackToDashboard = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <Paper style={{ padding: theme.spacing(3), marginTop: theme.spacing(3), background: '#fff' }}>
      <Button
        startIcon={<ArrowBackIosIcon />}
        onClick={handleBackToDashboard}
        style={{ marginBottom: theme.spacing(2) }}
      >
        Back to Dashboard
      </Button>
      <Typography variant="h6" gutterBottom align='center'>
        Expense History for User {userId}
      </Typography>
      <div style={{ height: '500px', marginBottom: theme.spacing(2) }}>
        <Bar data={expensesData} options={options} />
      </div>
      <Typography variant="h6" gutterBottom>
        Individual Expenses
      </Typography>
      <List style={{ maxHeight: '300px', overflow: 'auto' }}>
        {individualExpenses.map((expense, index) => (
          <ListItem key={index} style={{ backgroundColor: getGroupColor(index), marginBottom: theme.spacing(1), borderRadius: theme.shape.borderRadius }}>
            <ListItemText
              primary={`${expense.name}`} // Use the expense.name or expense.description as per your data model
              secondary={`Amount: $${expense.balance} - Date: ${new Date(expense.created_at).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default History;
