/* eslint-disable react/jsx-no-undef */
import React from 'react'
/* import Header from 'components/Header' */
import { useCookies } from 'react-cookie'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TinderCards from './components/TinderCards/TinderCards';
import Home from './pages/Home'
/* import Dashboard from './pages/Dashboard' */
/* import OnBoarding from './pages/OnBoarding' */

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
        <Route path="/tinder-cards" element={<TinderCards />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

