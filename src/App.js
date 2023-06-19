/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line import/no-named-as-default
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from './reducers/User';
// import { UserCard } from './TinderCardTest';
// import LoginPage from './components/MockupLogin'
import { Dashboard } from './components/DashBoard';
import { EditProfilePage } from './components/EditProfilePage';
import { Picture } from './components/profilePic'
import Home from './pages/Home';
import { UserCard } from './components/TinderCardTest';
import { Potential } from './components/potentialmatches';
import { Matched } from './components/matched';
import { Liked } from './components/liked';
import { Disliked } from './components/disliked';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });
  const store = configureStore({ reducer });

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tinder-cards" element={<UserCard />} />
          {/* <Route path="/tinder-cards" element={<TinderCards />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/*     <Route path="/tinder-cards" element={<TinderCards />} /> */}
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/picture" element={<Picture />} />
          <Route path="/pot" element={<Potential />} />
          <Route path="/matched" element={<Matched />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/disliked" element={<Disliked />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}