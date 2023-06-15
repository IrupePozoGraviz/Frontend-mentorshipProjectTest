/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { mentees } from './UserData';
import { NavBar } from './LogedInNav';

export const UserCard = () => {
  const [currentMenteeIndex, setCurrentMenteeIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  const handleNextMentee = () => {
    const nextIndex = currentMenteeIndex + 1;
    if (nextIndex < mentees.length) {
      setCurrentMenteeIndex(nextIndex);
    } else {
      console.log('No more mentees to show.');
      // You can handle the case when there are no more mentees to show
    }
  };

  const handleLikePerson = (likePersonUserId) => {
    console.log(`Liked: ${likePersonUserId}`);
    setLikedUsers([...likedUsers, likePersonUserId]);
    handleNextMentee();
  };

  const handleDislikePerson = (dislikePersonUserId) => {
    console.log(`Disliked: ${dislikePersonUserId}`);
    setDislikedUsers([...dislikedUsers, dislikePersonUserId]);
    handleNextMentee();
  };

  const menteesData = mentees[currentMenteeIndex];

  return (
    <div className="">
      <NavBar />
      <div className="">
        <h1>Lizzos Profile </h1>
        <div className="">
          <p>Role: Mentor</p>
        </div>
        <div className="tinderkortet">
          <img className="profile-image" src={menteesData.image} alt="mentee" />
          <div className="Text">
            <h3>{menteesData.userName}</h3>
            <p>{menteesData.pronoun}</p>
            <p>{menteesData.firstName}</p>
            <p>{menteesData.role}</p>
            <p>{menteesData.bio}</p>
            <p>{menteesData.preferences}</p>
            <p>{menteesData.emoji}</p>
          </div>
          <div className="button-containers">
            <button
              className="accept-buttons"
              type="button"
              onClick={() => handleLikePerson(menteesData.id)}>
            Accept
            </button>
            <button
              className="decline-buttons"
              type="button"
              onClick={() => handleDislikePerson(menteesData.id)}>
            Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};