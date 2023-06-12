/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
/* In this example, the EditProfilePage component renders a  form with input fields for each profile attribute (username, email, role, preferences, and firstName). 
 The value of each input field is set based on the userProfile 
 state obtained from the Redux store using useSelector. 
 When the user makes changes to the input fields, the corresponding set action from the Redux store is dispatched to update the state.
The form submission triggers the handleSubmit function, 
which sends a PUT request to the server to update the user's profile. 
You can handle the successful update and error cases within the handleSubmit function.

Make sure to include the necessary imports and integrate the EditProfilePage component into your application as needed. */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './Utils'

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName] = useState('');
  const [role, setRole] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      // Redirect to the profile page after successful registration
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  }, [registrationSuccess, navigate]);

  /* const handlePreferenceChange = (e) => {
    const selectedPreferences = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferences(selectedPreferences);
  }; */

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
      const response = await fetch(API_URL(`user/${userId}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
    <main className="edit-profile-container">
      <h1>EDIT</h1>
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId} className="box-container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={userProfile.username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
                placeholder="Enter your username"
                aria-label="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={userProfile.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Enter your email"
                aria-label="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={userProfile.role}
                onChange={(e) => dispatch(setRole(e.target.value))}
                placeholder="Enter your role"
                aria-label="Role" />
            </div>
            <div className="form-group">
              <label htmlFor="preferences">Preferences</label>
              <input
                type="text"
                id="preferences"
                value={userProfile.preferences}
                onChange={(e) => dispatch(setPreferences(e.target.value))}
                placeholder="Enter your preferences"
                aria-label="Preferences" />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={userProfile.firstName}
                onChange={(e) => dispatch(setFirstName(e.target.value))}
                placeholder="Enter your first name"
                aria-label="First Name" />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </main>
  );
};
/* import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { } from '../reducers/User'
import { API_URL } from './Utils'

export const EditProfilePage = () => {
  const [loading, setLoading] = useState(false)
  // const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const dispatch = useDispatch()
  const userProfile = useSelector((store) => store.user.profile)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify({ username: userProfile.username,
          email: userProfile.email,
          role: userProfile.role,
          preferences: userProfile.preferences,
          firstName: userProfile.firstName })
      };
      const response = await fetch(API_URL(`user/${userId}`), options)
      const data = await response.json()
      if (data.success) {
        dispatch(setUsername(data.profile.username))
        dispatch(setEmail(data.profile.email))
        dispatch(setRole(data.profile.role))
        dispatch(setPreferences(data.profile.preferences))
        dispatch(setFirstName(data.profile.firstName))
      } else {
        dispatch(setError(error.message))
      }
      dispatch(setError(error.message))
    } finally {
      setLoading(false)
    }
  }
    
  return (
    <main className="edit-profile-container">
      <h1>EDIT</h1>
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId} className="box-container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={userProfile.username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
                placeholder="Enter your username"
                aria-label="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={userProfile.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Enter your email"
                aria-label="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={userProfile.role}
                onChange={(e) => dispatch(setRole(e.target.value))}
                placeholder="Enter your role"
                aria-label="Role" />
            </div>
            <div className="form-group">
              <label htmlFor="preferences">Preferences</label>
              <input
                type="text"
                id="preferences"
                value={userProfile.preferences}
                onChange={(e) => dispatch(setPreferences(e.target.value))}
                placeholder="Enter your preferences"
                aria-label="Preferences" />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={userProfile.firstName}
                onChange={(e) => dispatch(setFirstName(e.target.value))}
                placeholder="Enter your first name"
                aria-label="First Name" />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </main>
  );
}; */
