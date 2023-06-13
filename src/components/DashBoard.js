/* eslint-disable react/no-unescaped-entities */
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
// import { match } from '../reducers/match';
import TinderCard from 'react-tinder-card'
import { API_URL } from './Utils';
import { setError } from '../reducers/User';

export const Dashboard = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const currentUser = useSelector((store) => store.user);
  /* const userPreferences = useSelector((store) => store.user.preferences); */

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
          console.log(data.response)
          // här ska vi spara users i en state variable

          // om användaren är mentor, vill vi bara spara mentees
          if (currentUser.role === 'mentor') {
            // då vill vi ha mentees
            const mentees = data.response.users.filter((user) => user.role === 'mentee')

            setMatchingList(mentees)
          } else {
            // annars vill vi ha mentors
            const mentors = data.response.users.filter((user) => user.role === 'mentor')
            setMatchingList(mentors)
          }

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

  /* const filteredMentors = matchedMentors.filter((mentor) => mentor.preferences.includes(userPreferences));
  const handleAcceptMentor = (mentor) => {
    const updatedMentors = matchedMentors.filter((m) => m.id !== mentor.id);
    setMatchedMentors(updatedMentors);
  };
  const handleDeclineMentor = (mentor) => {
    const updatedMentors = matchedMentors.filter((m) => m.id !== mentor.id);
    setMatchedMentors(updatedMentors);
  }; */

  const onSwipe = (direction) => {
    console.log(`You swiped: ${direction}`)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier}  left the screen`)
  }

  return (
    <main className="profile-container">

      <div key={userId} className="box-container">

        <div className="profile-header">
          <h2>Dashboard</h2>
          <p> Dashboard/landnindssida typ: liked persons should be displayed for user in a
        page together with more info Landningssida, där det typ står hej
        mentor/mentee du har 100 mentorer väntande börja välj(decide on which component!).
        Här finns en icon som vid klick tar användaren till "cards-att likea"-sidan.
          </p>
          <h1>{`${currentUser.username}'s Profile`}</h1>
          <p>{`role: ${currentUser.role}`}</p>
        </div>
        {loading ? 'loading...' : <div><h1>Get list of mentors/mentees here</h1>{matchingList.map((user) => <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}><UserCard user={user} /></TinderCard>)}</div>}
      </div>

    </main>
  );
};

// style det här! // behvöer en like knapp som skickar med user-id för det kortet som triggar en PUT/PATCH i backendet som uppdaterar matchen i databasen för den användaren och lägger till den i matchlistan för den användaren (i en array i databasen)
// behöver en dislike knapp som triggar en PUT/PATCH i backendet som uppdaterar matchen i databasen för den användaren och lägger till den i matchlistan för den användaren (i en array i databasen)

const UserCard = ({ user }) => {
  console.log('user', user)
  return (
    <div className="mentorcard">
      <p> Mentor card</p>
      <p>{user.username}</p>
      <p>{user.role}</p>
      {/* {user.preferences.map((pref) => <p>{pref}</p>)} */}
    </div>
  )
}