// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { registerDoctor } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/doctor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Registration successful. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            } else {
                const data = await response.json();
                setMessage(data.error || 'Registration failed. Try again.');
            }
        } catch (err) {
            console.error('Error during registration:', err.message);
            setMessage('Error during registration. Please try again.');
        }
    };
    

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
