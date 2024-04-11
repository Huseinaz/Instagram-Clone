import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const Post = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState();

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setCaption('');
      setImage();
    } catch (error) {
      console.error('Error creating post:', error.response.data.message);
    }
  };

  return (
    <div className="post-form">
      <h2 className="post-form-title">Create a New Post</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caption" className="form-label">Caption:</label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Post</button>
      </form>
    </div>
  );
};

export default Post;
