import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const AdminDashBoard = () => {
  const { token } = useAuth() || { token: '' };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:9000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users', error);
        }
      } else {
        console.error('No token available');
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Render user data */}
    </div>
  );
};

export default AdminDashBoard;
