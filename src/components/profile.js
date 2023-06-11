/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
// detta är privata profilen som ej ses av andra användare
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setUsername, setEmail, setRole, setPreferences, setFirstname, setError } from '../reducers/user';
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

  const userProfile = useSelector((store) => store.user);
  // console.log('Initial User Profile:', userProfile);

  const isOwner = userProfile.userId === userId;
  console.log('Is Owner?', isOwner);

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
        console.log('API Response:', response);
        const data = await response.json();
        console.log(data.response)

        if (data.success) {
          const { username, email, role, preferences, firstName } = data.response;
          console.log(data.response)
          dispatch(setUsername(username));
          dispatch(setEmail(email));
          console.log('email in Redux:', email);
          dispatch(setRole(role));
          console.log('role in Redux:', role);
          dispatch(setPreferences(preferences));
          console.log('preferences in Redux:', preferences);
          dispatch(setFirstname(firstName));
          console.log('firstName in Redux:', firstName);
          dispatch(setError(null));
        } else {
          dispatch(setError('Failed to fetch user profile.'));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    socket.on('chat message', () => {
      setChatLog((prevChatLog) => [...prevChatLog, message]);
    });

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
  return (
    <main className="profile-container">
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId} className="box-container">
          <div className="profile-header">
            <Picture userId={userId} />
          </div>
          <div className="profile-header">
            <h1>{`${userProfile.username}'s Profile`}</h1>
          </div>

          <div className="profile-info">
            <p>{`email: ${isOwner ? userProfile.email : 'Not visible'}`}</p>
            <p>{`name: ${userProfile.firstName}`}</p>
            <p>{`role: ${userProfile.role}`}</p>
            <p>{`preferences: ${userProfile.preferences}`}</p>
          </div>
          <section className="bio-section">
            {isOwner ? <BioEditor /> : <p>Bio not visible</p>}
          </section>
          <section className="matches-section">
            <h2>Matches</h2>
            {isOwner ? (
              <p>Here you will see your matches,
                and also if you click you get the
                swipe function but with clickinstead
              </p>
            ) : (
              <p>Matches not visible</p>
            )}
          </section>
          {isOwner && (
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
          )}
        </div>
      )}
    </main>
  );
};