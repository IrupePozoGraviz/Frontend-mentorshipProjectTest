/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from './Utils';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (registrationSuccess) {
      // Redirect to the profile page after successful registration
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  }, [registrationSuccess, navigate]);

  const handlePreferenceChange = (e) => {
    const selectedPreferences = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferences(selectedPreferences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a user object with the form data
    const user = {
      username,
      password,
      email,
      firstName,
      lastName,
      role,
      preferences
    };

    // Send a POST request to the backend API
    try {
      const response = await fetch(API_URL('register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
          // Include the access token in the request headers
        },
        body: JSON.stringify(user)
      });

      // Check the response status
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log('Registration successful:', data);
        setRegistrationSuccess(true);

        // Redirect to the profile page after successful registration
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        // Registration failed
        const error = await response.json();
        console.log('Registration failed:', error);
      }
    } catch (error) {
      // Network error
      console.log('Network error:', error);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>
        <div>
          <label>Preferences:</label>
          <select multiple value={preferences} onChange={handlePreferenceChange}>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            {/* Add other preference options here */}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {/* Redirect to the profile page */}
      {registrationSuccess && <p>Redirecting to profile page...</p>}
    </div>
  );
};