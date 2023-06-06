/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Header from 'components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TinderCards from './components/TinderCards/TinderCards';
import Home from './pages/Home';
import Registration from './pages/Registration'
import './index.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/registration" element={<Registration />} /> {/* Add this route for Registration */}
        <Route path="/tinder-cards" element={<TinderCards />} />
      </Routes>
    </BrowserRouter>
  )
}
