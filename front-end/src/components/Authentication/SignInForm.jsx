import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import './index.css'

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.authorisation.token);
                navigate('/home');
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            setError('Wrong email or password');
        }
    };

    return (
        <div className='main-auth'>
            <h2>Instagram</h2>
            <form className="flex column" onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <span className="register-link" onClick={() => navigate('/signup')}>
                    Sign up
                </span>
            </p>
        </div>
    );
}

export default SignInForm
