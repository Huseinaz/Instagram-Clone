import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileEdit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/get');
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setBio(userData.bio);
                setPassword(userData.password);
            } catch (error) {
                console.error('Error fetching users:', error.response.data.message);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/update', {
                name,
                email,
                bio,
                password
            });
            console.log(response);
        } catch (error) {
            console.error('Error updating', error.message);
        }
    };

    return (
        <div className='profile-edit'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit