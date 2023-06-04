/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Header from 'components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TinderCards from './components/TinderCards/TinderCards';
import Registration from './pages/Registration'
/* import HomePage from 'pages/HomePage'; */

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/header" element={<Header />} />
        <Route path="/registration" element={<Registration />} /> {/* Add this route for Registration */}
        <Route path="/tinder-cards" element={<TinderCards />} />
      </Routes>
    </BrowserRouter>
  )
}
