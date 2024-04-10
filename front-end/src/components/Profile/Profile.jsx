import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const Profile = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/get');
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = response.data;
      console.log(data);
      if (data) {
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        setBio(data.user.bio);
        setImage(data.user.profile_picture);
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("profile_picture", imageData);

      const response = await axios.post('http://localhost:8000/api/user/update', formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("User updated successfully");
        getUserInfo();
        setIsEditing(false);
      } else {
        console.log("Failed to update user:", response.data.message);
      }
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageData(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const editUser = () => {
    setIsEditing(true);
  };

  const closeEditUser = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-wrapper">
      {isEditing && <div className="blurred-overlay"></div>}
      <div className="profile-header">
        <img
          src={
            image
              ? "http://127.0.0.1:8000/profile_pictures/" + image
              : "./images/Assets/avatar.png"
          }
          alt="user-profile"
          className="profile-picture"
        />
        <div className="user-stats">
            <p>{user.followers_count} Followers</p>
            <p>{user.followings_count} Followings</p>
        </div>
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <button className="edit-button" onClick={editUser}>
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="blurred-overlay">
          <div className="light-gray-bg edit-form">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              className="choose-image-button"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="edit-buttons">
              <button className="cancel-btn" onClick={closeEditUser}>
                Cancel
              </button>
              <button className="save-btn" onClick={updateUserInfo}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
