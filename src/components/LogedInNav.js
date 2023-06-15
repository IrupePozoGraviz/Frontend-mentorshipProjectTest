import { Link } from 'react-router-dom';
import React from 'react';

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <Link to="/">Log Out</Link>
        <li>
          <Link to="/dashboard">My Dashboard</Link>
        </li>
        <li>
          <Link to="/edit">Edit Profile</Link>
        </li>
        <li>
          <Link to="/picture">Picture</Link>
        </li>
      </ul>
    </nav>
  );
};