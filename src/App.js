/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from './reducers/user';
import bio from './reducers/bio';
import { match } from './reducers/match';
import { ProfilePage } from './components/profile';
import TinderCards from './components/TinderCards/TinderCards';
import { Dashboard } from './components/DashBoard';
import Home from './pages/Home';

const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    bio: bio.reducer,
    match: match.reducer
  });
  const store = configureStore({ reducer });

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tinder-cards" element={<TinderCards />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/matches" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App

