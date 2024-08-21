import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './AdminDashBoard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdminDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users', {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Prepare data for charts
  const loginCounts = users.reduce((acc, user) => {
    const date = new Date(user.lastLoginDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(loginCounts);
  const dataCounts = Object.values(loginCounts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Logins per Day',
        data: dataCounts,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [
          users.filter(user => user.gender === 'Male').length,
          users.filter(user => user.gender === 'Female').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="charts">
        <div className="chart-container">
          <h2>Daily Login Counts</h2>
          <Line data={chartData} />
        </div>
        <div className="chart-container">
          <h2>User Gender Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Count</th>
            <th>Gender</th>
            <th>Last Login Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.count}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.lastLoginDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashBoard;
