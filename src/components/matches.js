// denna sida staplar upp alla matches men utan att matcha for now

/*
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match } from '../reducers/match';
import { API_URL } from './Utils';

export const MatchedPairs = () => {
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [loading, setLoading] = useState(true); // Define the loading state
  const accessToken = useSelector((store) => store.user.accessToken);
  const matches = useSelector((store) => store.match.matchedPairs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMatchedPairs = async () => {
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
          setMatchedPairs(data.response.matchedPairs);
          dispatch(match.setMatchedPairs(data.response.matchedPairs));
        } else {
          throw new Error('Failed to fetch matched pairs');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when the request is completed
      }
    };

    fetchMatchedPairs();
  }, []);

  return (
    <div>
      <h2>Matched Pairs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Number of Matches: {matches.length}</p>
          {matchedPairs.map((pair, index) => (
            <div key={index}>
              <p>Mentor: {pair.mentor.username}</p>
              <p>Mentee: {pair.mentee.username}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
*/