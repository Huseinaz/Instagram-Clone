import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data.posts);
      console.log(response);
    } catch (error) {
      console.error('Error fetching posts:', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='home-page'>
      <nav className='navbar'>
        {/* Your Navbar Content Goes Here */}
        Navbar
      </nav>
      <div className='posts-list'>
        {posts.map((post) => (
          <div key={post.id} className='post'>
            <div className='post-header'>
              <img
                className='user-avatar'
                src={`http://localhost:8000/images/${post.user.profile_picture}`}
                alt={post.user.name}
              />
              <p className='username'>{post.user.name}</p>
            </div>
            <img className='post-image' src={`http://localhost:8000/images/${post.image}`} alt={post.caption} />
            <div className='post-details'>
              <p className='username'>{post.user.name}</p>
              <p className='post-caption'>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
