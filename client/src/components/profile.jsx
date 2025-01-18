import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [doctor, setDoctor] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            console.log('Token fetched from localStorage:', token); // Debugging
        
            if (!token) {
                setMessage('Please log in to view your profile.');
                navigate('/login');
                return;
            }
        
            try {
                const response = await fetch('http://localhost:3001/doctor/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Add "Bearer " prefix
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setDoctor(data);
                } else {
                    throw new Error('Unauthorized');
                }
        
            } catch (error) {
                console.error('Error fetching profile:', error.message);
                setMessage('Error fetching profile. Please login again.');
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/login'); // Redirect to login
            }
        };

        fetchProfile();
    }, [navigate]);

    if (message) {
        return <p>{message}</p>;
    }

    if (!doctor) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <h1>Welcome, Dr. {doctor.name}</h1>
            <p>ID: {doctor._id}</p>
        </div>
    );
};

export default Profile;
