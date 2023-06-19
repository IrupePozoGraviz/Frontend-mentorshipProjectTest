/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

// code is showing but dislike and like logic not working

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from './Utils';
import { setError } from '../reducers/User';
import { NavBar } from './LogedInNav';

export const Potential = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDirection, setLastDirection] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };

        const response = await fetch(API_URL('/users'), options);
        const data = await response.json();

        if (data.success) {
          let filteredUsers = data.response.users;

          if (currentUser.role === 'mentor') {
            filteredUsers = data.response.users.filter(
              (user) => user.role === 'mentee'
            );
          } else {
            filteredUsers = data.response.users.filter(
              (user) => user.role === 'mentor'
            );
          }

          setMatchingList(filteredUsers);
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
      fetchUsers();
    }
  }, [dispatch, accessToken, userId]);

  const swiped = (direction, likePersonUserId) => {
	if (direction === 'right') {
	  handleLikePerson(likePersonUserId);
	} else if (direction === 'left') {
	  setDislikedUsers(prevDislikedUsers => [...prevDislikedUsers, likePersonUserId]);
	}
	setLastDirection(direction);
  };
  

  const handleLikePerson = (likePersonUserId) => {
    fetch(API_URL(`/likedPersons`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        likedUserId: likePersonUserId
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLikedUsers([...likedUsers, likePersonUserId]);
        } else {
          console.error('Failed to save liked person');
        }
      })
      .catch((error) => {
        console.error('Failed to save liked Person', error);
      });
  };

  const filteredMatchingList = matchingList.filter(
    (user) =>
      !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id)
  );

  return (
    <div className="nav">
      <NavBar />
      <main className="dashboard">
        <div className="box-container">
          <div className="profile-header">
            <h1>{`${currentUser.username}, here are your potential mentors/mentees`}</h1>
            <p>{`Your role: ${currentUser.role}`}</p>
          </div>
          {loading ? (
            'Loading...'
          ) : (
            <div>
              {filteredMatchingList.length === 0 ? (
                <p>No more potential matches available.</p>
              ) : (
                filteredMatchingList.map((user) => (
                  <div
                    className="TinderCard"
                    key={user.username}
                  >
                        <div className="photo-container">
                          <img
                            src={user.profilePic}
                            alt={`Picture of ${user.username}`}/>
							</div>
<div className="profile-info"> 
                          <p>{user.username}</p>
                          <p>{user.role}</p>
                          <p>Preferences:</p>
                          {user.preferences.map((pref, index) => (
                            <p key={index}>{pref}</p>
                          ))}
                          <p>Info about ourselves</p>
                          <p>Emojis to show extra</p>
                        </div>
                        <button
						className="primary-button"
                          type="button"
                          onClick={() => handleLikePerson(user.id)}>
                          Accept
                        </button>
                        <button
						className="primary-button"
                          type="button"
                          onClick={() =>
                            setDislikedUsers([...dislikedUsers, user.id])
                          }
                        >
                          Decline
                        </button>
                      </div>
                   
                ))
              )}
            </div>
          )}
          {lastDirection && (
            <h2 className="infoText">You swiped {lastDirection}</h2>
          )}
        </div>
      </main>
    </div>
  );
};
