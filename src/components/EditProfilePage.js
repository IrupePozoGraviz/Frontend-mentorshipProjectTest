/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './Utils';
import { Picture } from './profilePic';
import Aretha from '../images/aretha.jpeg';

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [preferences, setPreferences] = useState([]);
  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  console.log('accessToken', accessToken)
  console.log('userId', userId)
  const handlePreferenceChange = (e) => {
    const selectedPreferences = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferences(selectedPreferences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL(`user/${userId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
          role,
          preferences
        })
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        // Redirect to the profile page after successful profile update
        navigate('/profile');
      } else {
        const error = await response.json();
        console.log('Profile update failed:', error);
      }
    } catch (error) {
      console.log('Network error:', error);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await fetch(API_URL(`user/${userId}`), {
          method: 'DELETE',
          headers: {
            Authorization: accessToken
          }
        });

        if (response.ok) {
          console.log('Profile deleted successfully');
          // Redirect to the home page or any desired location after profile deletion
          navigate('/');
        } else {
          const error = await response.json();
          console.log('Profile deletion failed:', error);
        }
      } catch (error) {
        console.log('Network error:', error);
      }
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>
      <Picture className="picture-container" />
      <section className="form-container">
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
          <div className="multiple-input-container">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
          <div className="multiple-input-container">
            <label>Preferences:</label>
            <select multiple value={preferences} onChange={handlePreferenceChange}>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              {/* Add other preference options here */}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
      <button className="btnEdit" type="submit" onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};
