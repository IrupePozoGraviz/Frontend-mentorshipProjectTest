/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import user from '../reducers/User'
import { API_URL } from './Utils'
import { RegistrationPage } from './registration'

const LogIn = ({ setLogIn, isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(null)
  const login = 'login'; // this is the slug for the login endpoint
  const dispatch = useDispatch(); // install react-redux by running `npm i react-redux` in the terminal
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  const handleClick = () => {
    setLogIn(false)
  }
  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };
    fetch(API_URL(login), options)
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Data:', data);
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setRole('mentee'));
          dispatch(user.actions.setUserId(data.response.id));
          // ändra detta så att hela usern blir sparad i global store när man loggar in
          dispatch(user.actions.setError(null));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setError(data.response))
        }
      });
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      {!isSignUp && (
        <>
          <h2>LOG IN</h2>
          <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="Username"
              name="Username"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)} />
            <input className="secondary-button" type="submit" />
          </form>
        </>)}
      {isSignUp && (
        <RegistrationPage />
      )}
    </div>
  )
}
export default LogIn