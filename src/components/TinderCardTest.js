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
      <div className="person-card">
        <div className="profile-header">
          <div className="Lizzo">
            <p className="loged-in-name">Lizzo</p>
            <p className="role-mentor">Mentor | </p>
          </div>
          <p className="loged-in-text">  | logged in</p>
        </div>

        <div className="photo-container">
          <img src={menteesData.image} alt="mentee" />
        </div>
        <div className="profile-info">
          <h3>{menteesData.firstName} {menteesData.lastName} {menteesData.emoji}</h3>
          <p>{menteesData.pronoun} / / {menteesData.role}</p>
          <p>{menteesData.bio}</p>
          <p>{menteesData.preferences}</p>
        </div>
      </div>
      <div className="button-container">
        <button
          className="primary-button"
          type="button"
          onClick={() => handleLikePerson(menteesData.id)}>
            Accept
        </button>
        <button
          className="primary-button"
          type="button"
          onClick={() => handleDislikePerson(menteesData.id)}>
            Decline
        </button>
      </div>
    </div>

  );
};
