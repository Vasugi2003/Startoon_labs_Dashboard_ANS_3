import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        const { data } = await axios.get('/api/users/profile', config);
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [auth]);

  return (
    <div>
      {userDetails ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Gender: {userDetails.gender}</p>
          <p>Login Count: {userDetails.count}</p>
          <p>Last Login Date: {new Date(userDetails.lastLoginDate).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
