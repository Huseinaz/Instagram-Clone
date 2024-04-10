// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './index.css';

// const Profile = () => {
//     const [user, setUser] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     const [image, setImage] = useState();
//     const [imageData, setImageData] = useState();

//     useEffect(() => {
//         getUserInfo();
//     }, []);

//     const getUserInfo = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/user/get');
//             if (response.status !== 200) {
//                 throw new Error(
//                     `Failed to fetch user data. Status: ${response.status}`
//                 );
//             }
//             const data = response.data;
//             console.log(data);
//             if (data) {
//                 setUser(data.user);
//                 setName(data.user.name);
//                 setEmail(data.user.email);
//                 setImage(data.user.profile_picture);
//             } else {
//                 console.error("Empty response data");
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error.message);
//         }
//     };

//     return (
//         <div>
//             <p>{user.name}</p>
//         </div>
//     )
// }

// export default Profile

import React from 'react'
import './index.css'
import ProfilePage from './ProfilePage'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
  return (
    <div>
        <ProfilePage />
        <ProfileEdit />
    </div>
  )
}

export default Profile