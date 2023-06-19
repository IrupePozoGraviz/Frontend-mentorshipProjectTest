
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */


/*  I would like in the return statement make a section where it says You have {number}
of potential matches klickhere to see them how could I build taht/*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavBar } from './LogedInNav';


export const Dashboard = () => {
  const currentUser = useSelector((store) => store.user);
  const potentialMatches = useSelector((store) => store.potentialMatches);

  if (!currentUser) {
    return <div>Loading...</div>; // Show a loading state until the user data is available
  }

  return (
    <div className="nav">
      <NavBar />
      <main className="dashboard">
        <div className="box-container">
          <div className="profile-header">
            <h1>{`Welcome ${currentUser.username}`}</h1>
            <p>{`Role: ${currentUser.role}`}</p>
          </div>
          <section className="potentialmatches">
            <h2>You have {potentialMatches ? potentialMatches.length : 0} potential matches</h2>
            <li className="navbar-item">
          <Link to="/pot">Potential matches</Link>
        </li>
          </section>
          <section className="matched">
            <h2>You Matched {potentialMatches ? potentialMatches.length : 0}</h2>
            <p>Antingen att en klickar sig vidare till en annan sida eller att det kommer upp små 
              tumbnails med bilden å namnet som en kan klicka på för att se bilden</p>
            <li className="navbar-item">
          <Link to="/matched">Matched</Link>
        </li>
          </section>
          <section className="Liked">
            <h2>You Liked {potentialMatches ? potentialMatches.length : 0}</h2>
            <li className="navbar-item">
          <Link to="/liked">Liked</Link>
        </li>
          </section>
          <section className="Disliked">
            <h2>You did not choose {potentialMatches ? potentialMatches.length : 0}</h2>
            <li className="navbar-item">
          <Link to="/disliked">didnt choose</Link>
        </li>
          </section>
        </div>
      </main>
    </div>
  );
};
