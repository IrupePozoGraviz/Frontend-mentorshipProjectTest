/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
// detta är privata profilen som ej ses av andra användare
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setUsername, setEmail, setRole, setPreferences, setError, setFirstname } from '../reducers/user';
import { API_URL } from './Utils';
import BioEditor from './biography';
import { Picture } from './profilePic';

const socket = io();

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL(`user/${userId}`), options);
        const data = await response.json();

        if (data.success) {
          const { username, email, firstName, role, preferences } = data.response;
          console.log('Firstname:', firstName);
          console.log(data.response)
          dispatch(setUsername(username));
          dispatch(setEmail(email));
          dispatch(setRole(role));
          dispatch(setPreferences(preferences));
          dispatch(setFirstname(firstName));
          dispatch(setError(null));
        } else {
          dispatch(setError('Failed to fetch user profile.'));
        }
      } catch (error) {
        dispatch(setError('An error occurred while fetching user profile.'));
      } finally {
        setLoading(false);
      }
    };

    console.log('AccessToken:', accessToken); // Log the value of accessToken
    console.log('UserId:', userId); //
    if (userId) {
      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    // Handle incoming chat messages
    socket.on('chat message', () => {
      setChatLog((prevChatLog) => [...prevChatLog, message]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chat message', message);
      setMessage('');
    }
  };
  const userProfile = useSelector((store) => store.user);
  const handlePictureUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch(
        API_URL(`/user/${userId}/upload-profile-picture`),
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: formData
        }
      );

      if (response.ok) {
        console.log('Profile picture uploaded successfully');
        // You can optionally update the profile picture state here if needed
      } else {
        console.log('Failed to upload profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
    }
  };

  return (
    <main className="profile-container">
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId} className="box-container">
          <div className="profile-header">
            {/* ... */}
            <Picture userId={userId} onPictureUpload={handlePictureUpload} />
          </div>
          <div className="profile-header">

            <h1>{`${userProfile.username}'s Profile`}</h1>
          </div>

          <div className="profile-info">
            <p>{`email: ${userProfile.email}`}</p>
            <p>{`name: ${userProfile.firstname}`}</p>
            <p>{`role: ${userProfile.role}`}</p>
            <p>{`preferences: ${userProfile.preferences}`}</p>
          </div>
          <section className="bio-section">
            <BioEditor />
          </section>
          <section className="matches-section">
            <h2>Matches</h2>
            <p>Here you will see your matches, and also if you click you get the swipe
              function but with clickinstead
            </p>
          </section>
          <div className="chat-section">
            <h2>Chat</h2>
            <div>
              <ul>
                {chatLog.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};