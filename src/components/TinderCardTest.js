import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { mentors, mentees } from './UserData';
/* import LoginPage from './MockupLogin'; */

export const UserCard = () => {
  /* const [users, setUsers] = useState([...mentors, ...mentees]); */
  const [lastDirection, setLastDirection] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  /* const [loading, setLoading] = useState(true); */

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
    <main className="dashboard">
      <div className="box-container">
        <div className="profile-header">
          <h1>{`${mentors.username}'s Profile`}</h1>
          <p>{`role: ${mentors.role}`}</p>
        </div>
        {/* {loading ? 'loading...' : <div><h1>Get list of mentors/mentees here</h1>{matchingList
          .filter((user) => !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id))
          .map((user) => */}

        <TinderCard
          key={mentors.username}
          onSwipe={(dir) => swiped(dir, mentors.username)}
          onCardLeftScreen={() => outOfFrame(mentors.username)}>
          <div className="swipe-container">
            <div className="card-container">
              <div className="card">
                <div className="card-image">
                  <img src={mentors.image} alt="mentor" />
                </div>
                <h3>{mentors.name}</h3>
                <p>{mentors.pronoun}</p>

                <p>{mentors.username}</p>
                <p>{mentors.role}</p>
                <p> {mentors.pronoun} </p>
                <p> info about ourselves </p>
                <p> Emojis to show extra </p>
                {/* {mentors.preferences.map((pref) => <p>{pref}</p>)} */}
              </div>
              <div className="card">
                <div className="card-image">
                  <img src={mentees.image} alt="mentor" />
                </div>
                <h3>{mentees.name}</h3>
                <p>{mentees.pronoun}</p>

              </div>
              <button
                type="button"
                onClick={() => handleLikePerson(mentors.id)}>
                                Accept
              </button>
              <button
                type="button"
                onClick={() => handleDislikePerson([...dislikedUsers, mentors.id])}>
                                Decline
              </button>
            </div>
          </div>
        </TinderCard>
      </div>
      {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText"> You rang</h2>}
    </main>
  );
};