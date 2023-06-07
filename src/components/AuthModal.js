/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
// import axios from 'axios' // install axios by running `npm i axios` in the terminal
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* import { useCookies } from 'react-cookie' */
import user from '../reducers/user'
import { API_URL } from './Utils'

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  // const [setCookie] = useCookies(null) // install react-cookie by running `npm i react-cookie` in the terminal
  const login = 'login'; // this is the slug for the login endpoint
  const dispatch = useDispatch(); // install react-redux by running `npm i react-redux` in the terminal
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  console.log(username, password, confirmPassword)
  // setCookie('UserId', response.data.userId)

  const handleClick = () => {
    setShowModal(false)
  }
  useEffect(() => {
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault()

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
        console.log('Login Data:', data)
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          console.log(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };
    /* try {
      if (isSignUp && (password !== confirmPassword)) {
        setError('Passwords need to match!')
        return
      }

      const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const success = response.status === 201
      if (success && isSignUp) navigate('/onboarding')
      if (success && !isSignUp) navigate('/dashboard')

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  } */

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>ⓧ</div>

      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
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
        {isSignUp && <input
          type="password"
          id="password-check"
          name="password-check"
          placeholder="confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)} />}
        <input className="secondary-button" type="submit" />

      </form>

      <hr />
      <h2>GET THE APP</h2>

    </div>
  )
}
export default AuthModal

/*

<h1>Log in</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
*/