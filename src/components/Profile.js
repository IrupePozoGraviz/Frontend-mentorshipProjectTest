/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setEmail, setRole, setPreferences, setError, setFirstname } from 'reducers/User';
import { API_URL } from './Utils';

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();

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

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  const userProfile = useSelector((store) => store.user);
  return (
    <div>
      <h2>Profile Page</h2>
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId}>
          <h1>{`${userProfile.username}'s Profile`}</h1>
          <p>{`email: ${userProfile.email}`}</p>
          <p>{`name: ${userProfile.firstName}`}</p>
          <p>{`role: ${userProfile.role}`}</p>
          <p>{`preferences: ${userProfile.preferences}`}</p>
        </div>
      )}
    </div>
  );
};
