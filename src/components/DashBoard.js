
/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

/* Denna sida har hand om Overall, this code sets up a dashboard page
that fetches user data,
fetches gender-filtered user data,
and allows users to swipe through cards representing potential matches.
It also handles updating matches and displaying swipe direction information. */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { match } from '../reducers/match';
import TinderCard from 'react-tinder-card'
import { API_URL } from './Utils';
import { setError } from '../reducers/User';



export const Dashboard = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDirection, setLastDirection] = useState(null);
  /*  FOR THE BUTTONS */
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);


  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');
  const currentUser = useSelector((store) => store.user);
  /* const userPreferences = useSelector((store) => store.user.preferences); */
  console.log('userId:', userId);
  console.log('accessToken:', accessToken);
  console.log('currentUser:', currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('accessToken:', accessToken);
    console.log('userId:', userId);
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };

        const response = await fetch(API_URL('/users'), options);
        const data = await response.json();

        if (data.success) {
          console.log(data.response)

          // add users in a state variable
          setMatchingList(data.response.users)
          console.log(matchingList)


          // om användaren är mentor, vill vi bara spara mentees
          if (currentUser.role === 'mentor') {
            // då vill vi ha mentees
            const mentees = data.response.users.filter((user) => user.role === 'mentee')

            setMatchingList(mentees)
          } else {
            // annars vill vi ha mentors
            const mentors = data.response.users.filter((user) => user.role === 'mentor')
            setMatchingList(mentors)
          }

          dispatch(setError(null));
        } else {
          dispatch(setError('Failed to fetch user profile.'));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUsers();
    }
  }, [dispatch, accessToken, userId]);
  console.log('matchingList:', matchingList);
  console.log('loading:', loading);
  console.log('likedUsers:', likedUsers);
  console.log('dislikedUsers:', dislikedUsers);

  const onSwipe = (direction) => {
    console.log(`You swiped: ${direction}`)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier}  left the screen`)
  }
  const swiped = (direction, likePersonUserId) => {
    console.log('removing: ' + likePersonUserId)
    if (direction === 'right') {
      handleLikePerson(likePersonUserId)
    } else if (direction === 'left') {
      setDislikedUsers([...dislikedUsers, likePersonUserId])
      setLastDirection(direction)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (likePersonUserId) => {
    console.log(likePersonUserId + ' left the screen!')
  }

  // const fakeLoggedinUserId = '64772d4207f2d41ce2062496'
  const handleLikePerson = (likePersonUserId) => {
    fetch(API_URL(`/likedPersons`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        likedUserId: likePersonUserId
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLikedUsers([...likedUsers, likePersonUserId]);
        } else {
          console.error('Failed to save liked person');
        }
      })
      .catch((error) => {
        console.error('Failed to save liked Person', error);
      });
  };

  <button type="button" onClick={() => setDislikedUsers([...dislikedUsers, user.id])}>
    Decline
  </button>


  return (
    <main className="dashboard">

      <div key={userId} className="box-container">

        <div className="profile-header">
          <h2>Dashboard</h2>
          <p> Dashboard/landnindssida typ: liked persons should be displayed for user in a
            page together with more info Landningssida, där det typ står hej
            mentor/mentee du har 100 mentorer väntande börja välj(decide on which component!).
            Här finns en icon som vid klick tar användaren till "cards-att likea"-sidan.
          </p>
          <h1>{`${currentUser.username}'s Profile`}</h1>
          <p>{`role: ${currentUser.role}`}</p>
         
        </div>
        {loading ? 'loading...' : <div><h1>Get list of mentors/mentees here</h1>{matchingList
          .filter((user) => !likedUsers.includes(user.id) && !dislikedUsers.includes(user.id))
          .map((user) =>
            <TinderCard
              key={user.username} onSwipe={(dir) => swiped(dir, user.username)} onCardLeftScreen={() => outOfFrame(user.username)} /* preventSwipe={['right', 'left']} */>
          <div className="swipe-container">
            <div className="card-container">
              <div className="kort">
                <img
                  src="https://placebear.com/200/300"
                  alt="Profile"
                  style={{ width: 200, height: 300 }} />
                <p> Mentor card</p>
                <p> Picture of person </p>
                <img src={user.profilePic} alt={`Picture of ${user.username}`}/>
                <p>{user.username}</p>
                <p>{user.role}</p>
                <p> preferences: </p>
                <p> info about our selfs </p>
                <p> Emojis to show extra </p>
                {user.preferences.map((pref) => <p>{pref}</p>)}
              </div>
                  <button type="button" onClick={() => handleLikePerson(user.id)}>
                    Accept
                  </button>
                  <button type="button" onClick={() => setDislikedUsers([...dislikedUsers, user.id])}>
                    Decline
                  </button>
            </div>
          </div>
        </TinderCard>
        )}
        </div>}
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>

    </main>
  );
};