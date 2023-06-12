/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

/* Denna sida har hand om Overall, this code sets up a dashboard page
that fetches user data,
fetches gender-filtered user data,
and allows users to swipe through cards representing potential matches.
It also handles updating matches and displaying swipe direction information. */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match } from '../reducers/match';
import { API_URL } from './Utils';
import TinderCards from './TinderCards';

export const Dashboard = () => {
  const [matchedMentors, setMatchedMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((store) => store.user.accessToken);
  const currentUser = useSelector((store) => store.user.username);
  const userPreferences = useSelector((store) => store.user.preferences);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMatchedMentors = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };

        const response = await fetch(API_URL('/match'), options);
        if (response.ok) {
          const data = await response.json();
          const { matchedPairs } = data.response;
          const filteredMentors = matchedPairs
            .filter((pair) => pair.mentee.username === currentUser)
            .map((pair) => pair.mentor);
          setMatchedMentors(filteredMentors);
          dispatch(match.actions.setMatchedPairs(matchedPairs));
        } else {
          throw new Error('Failed to fetch matched mentors');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedMentors();
  }, []);

  const filteredMentors = matchedMentors.filter((mentor) => mentor.preferences.includes(userPreferences));
  const handleAcceptMentor = (mentor) => {
    const updatedMentors = matchedMentors.filter((m) => m.id !== mentor.id);
    setMatchedMentors(updatedMentors);
  };
  const handleDeclineMentor = (mentor) => {
    const updatedMentors = matchedMentors.filter((m) => m.id !== mentor.id);
    setMatchedMentors(updatedMentors);
  };

  return (
    <div>
      <h2>Matched Mentors</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TinderCards
          matchedMentors={filteredMentors}
          handleAcceptMentor={handleAcceptMentor}
          handleDeclineMentor={handleDeclineMentor} />
      )}
    </div>
  );
};

