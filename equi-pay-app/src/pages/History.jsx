import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as Fetch from "../lib/fetch"; // Adjust the import path as necessary

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function History() {
  const { userId } = useParams();
  console.log(userId)
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await Fetch.get("expenses", { user_id: userId });
        // Assuming 'data' is an array of expense objects
        const labels = data.map(expense => new Date(expense.created_at).toLocaleDateString());
        const groupColors = data.map(expense => getGroupColor(expense.group_id)); // Function to get color based on group_id

        setExpensesData({
          labels,
          datasets: [{
            label: 'Expenses by Group',
            data: data.map(expense => expense.balance),
            backgroundColor: groupColors,
          }],
        });
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  // Define a function to map group_id to a color
  const getGroupColor = (groupId) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // example color array
    return colors[groupId % colors.length]; // adjust as needed for your group ids
  };

  return (
    <div>
      <h2>Expense History for User {userId}</h2>
      <div style={{ maxHeight: '400px' }}> {/* Set a max-height for the chart container */}
        <Bar data={expensesData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default History;