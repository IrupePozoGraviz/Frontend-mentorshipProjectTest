/* eslint-disable react/jsx-no-undef */

import React from 'react';
import Header from 'components/Header';
import '../components/Navbar';

const HomePage = () => {
  const authToken = true

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <h1>Swipe Right</h1>
        <button className="primary-button" onClick={handleClick} type="button">
          {authToken ? 'Signout' : 'Create Account'}
        </button>
        <Header />
      </div>
    </>
  );
}

export default HomePage;
