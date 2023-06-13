/* eslint-disable react-hooks/exhaustive-deps */
/** In summary, this code sets up a Tinder-like card interface with
 * swipe functionality, populating the cards with people's information. */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* import TinderCard from 'react-tinder-card'; */
import './TinderCards.css';
import { setUsername, setRole, setPreferences, setError } from '../reducers/User';
import { API_URL } from './Utils';

const TinderCards = ({ handleAcceptMentor, handleDeclineMentor }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();
  const [profiles] = useState([]);
  const [setLoading] = useState(false);

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
          const { username, role, preferences } = data.response;
          dispatch(setUsername(username));
          dispatch(setRole(role));
          dispatch(setPreferences(preferences));
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
  }, [dispatch, accessToken, userId]);

  return (
    <div>
      {profiles.length > 0 ? (
        profiles.map((person) => (
          <div key={person.name} className="mentor-card">
            <img src={person.url} alt="Mentor" />
            <div>
              <p>Mentor Name: {person.name}</p>
              <p>Bio: {person.bio}</p>
            </div>
            <div className="mentor-buttons">
              <button type="submit" onClick={() => handleAcceptMentor(person)}>Accept</button>
              <button type="submit" onClick={() => handleDeclineMentor(person)}>Decline</button>
            </div>
          </div>
        ))
      ) : (
        <p>No matched mentors found for the current users preferences.</p>
      )}
    </div>
  );
};

export default TinderCards;
