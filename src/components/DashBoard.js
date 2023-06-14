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
    <main className="dashboard">

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

// make a onclick event that for a "like-button" that triggers a function that adds the user to the matchlist in the database by sending a PUT/PATCH request to the backend that updates the matchlist for the user in the database (in an array in the database) like this:
// make a onclick event that for a "dislike-button" that triggers a function that adds the user to the matchlist in the database by sending a PUT/PATCH request to the backend that updates the matchlist for the user in the database (in an array in the database)
const fakeLoggedinUserId = '64772d4207f2d41ce2062496'

const handleLikePerson = (userId) => {
  fetch(API_URL(`/likedPersons/${fakeLoggedinUserId}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
      // Authorization: accessToken
    },
    body: JSON.stringify({
      likedUserId: userId
    })
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        // om ni vill navigera
      } else {
        console.error('Failed to save liked person')
      }
    })
    .catch((error) => {
      console.error('Failed to save liked Person', error)
    })
}
// style det här! // behvöer en like knapp som skickar med user-id för det kortet som triggar en PUT/PATCH i backendet som uppdaterar matchen i databasen för den användaren och lägger till den i matchlistan för den användaren (i en array i databasen)
// behöver en dislike knapp som triggar en PUT/PATCH i backendet som uppdaterar matchen i databasen för den användaren och lägger till den i matchlistan för den användaren (i en array i databasen)

const UserCard = ({ user }) => {
  console.log('user', user)
  return (
    <div className="swipe-container">
      <div className="card-container">
        <div className="kort">
          <img
            src="https://placebear.com/200/300"
            alt="Profile"
            style={{ width: 200, height: 300 }} />
          <p> Mentor card</p>
          <p> Picture of person </p>
          <p>{user.username}</p>
          <p>{user.role}</p>
          <p> preferences: </p>
          <p> info about our selfs </p>
          <p> Emojis to show extra </p>
          {/* {user.preferences.map((pref) => <p>{pref}</p>)} */}
        </div>
        <button
          type="button"
          onClick={() => handleLikePerson(user.id)}>Accept
        </button>
        <button
          type="submit">
          Decline
        </button>
      </div>
    </div>
  )
}