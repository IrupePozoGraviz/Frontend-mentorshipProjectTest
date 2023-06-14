/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from './reducers/User';
import TinderCards from './components/TinderCards';
import { Dashboard } from './components/DashBoard';
import { EditProfilePage } from './components/EditProfilePage';
import { Picture } from './components/profilePic'
import Home from './pages/Home';

const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });
  const store = configureStore({ reducer });

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/tinder-cards" element={<TinderCards />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tinder-cards" element={<TinderCards />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/picture" element={<Picture />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App

