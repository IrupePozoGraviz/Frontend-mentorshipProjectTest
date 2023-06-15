/* eslint-disable max-len */
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { mentors, mentees } from './UserData';
import { NavBar } from './LogedInNav';
/* import LoginPage from './MockupLogin'; */

export const UserCard = () => {
  /* const [users, setUsers] = useState([...mentors, ...mentees]); */
  const [matchingList, setMatchingList] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  /* const [loading, setLoading] = useState(true); */
  const mentorsData = mentors[0]; // Assuming you want to use the first mentor from the mentors array
  const menteesData = mentees[0]; // Assuming you want to use the first mentee from the mentees array. if i want to use all mentees, i need to use map() to loop through the mentees array and return a TinderCard component for each mentee.

  // Function to handle swiping action
  const swiped = (direction, userId) => {
    console.log(`Swiped ${direction} on user with ID: ${userId}`);
    setLastDirection(direction);
  };

  // Function to handle the end of swiping
  const outOfFrame = (userId) => {
    console.log(`User with ID ${userId} left the screen.`);
  };
  const handleLikePerson = (likePersonUserId) => {
    console.log(`Liked: ${likePersonUserId}`)
    setLikedUsers([...likedUsers, likePersonUserId])
    setLastDirection('right')
  }
  const handleDislikePerson = (dislikePersonUserId) => {
    console.log(`Disliked: ${dislikePersonUserId}`)
    setDislikedUsers([...dislikedUsers, dislikePersonUserId])
    setLastDirection('left')
  }

  return (
    <div className="dashboard">
      <NavBar />
      <div className="box-container">
        <div className="profile-header">
          <h1>{`${mentors.username}'s Profile`}</h1>
          <p>{`role: ${mentors.role}`}</p>
        </div>
        {/* {loading ? 'loading...' : <div><h1>Get list of mentors/mentees here</h1>{matchingList
          .filter((user) => !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id))
          .map((user) => */}

        <TinderCard
          key={mentorsData.id} // key is needed to prevent TinderCard from reusing the same component instance when the list of users changes (e.g. when a user is liked). This is a requirement of the TinderCard component. The key should be unique for each user. And since we have two arrays of users (mentors and mentees), we can use the user's ID as the key. mentorsData.id is the ID of the mentor, and menteesData.id is the ID of the mentee. here we use mentorsData.id, to get id from mentees as well, we need to use menteesData.id in the second TinderCard component below.
          onSwipe={(dir) => swiped(dir, mentorsData.userName)}
          onCardLeftScreen={() => outOfFrame(mentorsData.userName)}>
          <div className="swipe-container">
            <div className="card-container">
              <div className="card">
                <div className="card-image">
                  <img src={mentorsData.image} alt="mentor" />
                </div>
                <h3>{mentorsData.userName}s Profile</h3>
                <p>{mentorsData.pronoun}</p>

                <p>{mentorsData.firstName}</p>
                <p>{mentorsData.role}</p>
                <p> {mentorsData.bio}</p>
                <p> {mentorsData.emoji}</p>
                {/* {mentors.preferences.map((pref) => <p>{pref}</p>)} */}

                <button
                  className="accept-button" // to be added style to in css
                  type="button"
                  onClick={() => handleLikePerson(mentors.id)}>
                  Accept
                </button>
                <button
                  className="decline-button" // to be added style to in css
                  type="button"
                  onClick={() => handleDislikePerson([...dislikedUsers, mentors.id])}>
                  Decline
                </button>
              </div>

            </div>
          </div>
        </TinderCard>
        <TinderCard
          key={menteesData.id}
          onSwipe={(dir) => swiped(dir, menteesData.userName)}
          onCardLeftScreen={() => outOfFrame(menteesData.userName)}>

          <div className="swipe-container">
            <div className="card-container">
              <div className="card">
                <div className="card-image">
                  <img src={menteesData.image} alt="mentor" />
                </div>
                <h3>{menteesData.userName}</h3>
                <p>{menteesData.pronoun}</p>
                <p>{menteesData.firstName}</p>
                <p>{menteesData.role}</p>
                <p> {menteesData.bio}</p>
                <p> {menteesData.emoji}</p>
              </div>
              <button
                className="accept-button" // to be added style to in css
                type="button"
                onClick={() => handleLikePerson(mentors.id)}>
                                Accept
              </button>
              <button
                className="decline-button" // to be added style to in css
                type="button"
                onClick={() => handleDislikePerson([...dislikedUsers, mentors.id])}>
                                Decline
              </button>
            </div>
          </div>
        </TinderCard>
      </div>
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText"> You rang</h2>}

    </div>
  );
};
