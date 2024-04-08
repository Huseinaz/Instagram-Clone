import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import './index.css'

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
            });
            if (response && response.data && response.status === 201) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/home');
                return;
            } else {
                throw new Error('Failed to register');
            }
        } catch (error) {
          setError(error.response.data.message);
        }
    };

    return (
        <div className='main-auth'>
            <h2>Instagram</h2>
            <form className="flex column" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="field">
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="field">
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <button className="login-btn" type="submit">
                    Sign up
                </button>
            </form>
            <p>
                Have an account?{' '}
                <span className="register-link" onClick={() => navigate('/')}>
                    Log in
                </span>
            </p>
        </div>
    );
}

export default SignUpForm
