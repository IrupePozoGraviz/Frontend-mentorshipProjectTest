/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
// detta är privata profilen som ej ses av andra användare
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setEmail, setRole, setPreferences, setFirstName, setError } from '../reducers/User';
import { API_URL } from './Utils';
import { Dashboard } from './DashBoard';
import BioEditor from './biography';

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const userId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();
  const userProfile = useSelector((store) => store.user);
  const matchedPairs = useSelector((store) => store.match.matchedPairs);

  const isOwner = userProfile.userId === userId;

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
          const { username, email, role, preferences, firstName } = data.response;
          dispatch(setUsername(username));
          dispatch(setEmail(email));
          dispatch(setRole(role));
          dispatch(setPreferences(preferences));
          dispatch(setFirstName(firstName));
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
    <main className="profile-container">
      {loading ? <div>Loading...</div> : null}
      {userProfile && (
        <div key={userId} className="box-container">
          <div className="profile-header">
            <h1>{`${userProfile.username}'s Profile`}</h1>
            <p>{`role: ${userProfile.role}`}</p>
          </div>
          <div className="profile-image">
            <img src={userProfile.imageUrl} alt="profile" />
          </div>

          <div className="profile-info">
            <p>detta ska bort och in i edit profile</p>
            <p>{`email: ${isOwner ? userProfile.email : 'Not visible'}`}</p>
            <p>{`name: ${userProfile.firstName}`}</p>
            <p>{`preferences: ${userProfile.preferences}`}</p>
          </div>
          <section className="bio-section">
            <h2>Bio- flyttas till edit</h2>
            {isOwner ? <BioEditor /> : <p>Bio not visible</p>}
          </section>
          <section className="matches-section">
            <h2>Matches</h2>
            <p>Här ser vi vilken metor som en tackat ja till som en kan
               trycvka på och hamna i dess profil
            </p>
            {isOwner ? (
              <Dashboard />
            ) : (
              <p>{`Number of Matches: ${matchedPairs.length}`}</p>
            )}
          </section>
          <div>
            <p> Här vill vi att det ska komma upp en
              länk till dashboard när en har matchningar
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
