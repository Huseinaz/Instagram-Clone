import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState('');

    const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user/get');
          setUser(response.data.user);
          console.log(response);
        } catch (error) {
          console.error('Error fetching users:', error.response.data.message);
        }
      };
    
      useEffect(() => {
        fetchUser();
      }, []);

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={`http://localhost:8000/profile_pictures/${user.profile_picture}`} alt={user.name} className="profile-picture" />
                <h1>{user.name}</h1>
                <p>{user.bio}</p>
            </div>
        </div>
    );
}

export default ProfilePage