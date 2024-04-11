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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, [user.id]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts');
      const filteredPosts = response.data.posts.filter((post) => post.user_id === user.id);
      setPosts(filteredPosts);
      console.log(response);
    } catch (error) {
      console.error('Error fetching posts:', error.response.data.message);
    }
  };
  


  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/get', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("profile_picture", imageData);

      const response = await axios.post('http://127.0.0.1:8000/api/user/update', formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
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
        <div className="profile-info">
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
            <p className="stat">{user.posts_count} <span>Posts |</span></p>
            <p className="stat">{user.followers_count} <span>Followers |</span></p>
            <p className="stat">{user.followings_count} <span>Followings</span></p>
          </div>
        </div>
      </div>
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <button className="edit-button" onClick={editUser}>
            Edit Profile
          </button>
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
    <div className='home-page'>
      <div className='posts-list'>
        {posts.map((post) => (
          <div key={post.id} className='post'>
            <div className='post-header'>
              <img
                className='user-avatar'
                src={`http://localhost:8000/profile_pictures/${post.user.profile_picture}`}
                alt={post.user.name}
              />
              <p className='username'>{post.user.name}</p>
            </div>
            <img className='post-image' src={`http://localhost:8000/images/${post.image}`} alt={post.caption} />
            <p className='username'>{post.likes_count} likes</p>
            <div className='post-details'>
              <p className='username'>{post.user.name}</p>
              <p className='post-caption'>{post.caption}</p>
            </div>
            <p className='post-caption'>{post.comments_count} comments</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Profile;
