/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from './Utils';
import { bio } from '../reducers/bio';

export const Biography = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const bioItems = useSelector((store) => store.bio.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL('bio'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(bio.actions.setError(null));
          dispatch(bio.actions.setItems(data.response));
        } else {
          dispatch(bio.actions.setError(data));
          dispatch(bio.actions.setItems([]));
        }
      });
  }, []);

  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ message })
    };

    try {
      const response = await fetch(API_URL('bio'), options);
      const data = await response.json();

      if (data.success) {
        // Update bioItems with the new bio
        const updatedBioItems = [...bioItems, data.response];
        dispatch(bio.actions.setError(null));
        dispatch(bio.actions.setItems(updatedBioItems));
      } else {
        dispatch(bio.actions.setError(data.response));
      }
    } catch (error) {
      console.log('Error:', error);
    }

    setLoading(false);
  };

  const onBioDelete = (index) => {
    dispatch(bio.actions.deleteItem(index));
  };

  return (
    <div className="main secrets">
      <div className="secret-wrapper">
        <div className="secret-form">
          <textarea>
            Hello {username}
          </textarea>
          <textarea
            id="outlined-multiline-static"
            label="Write your bio here..."
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <button
            type="submit"
            onClick={handleSubmit}>
            Post bio
          </button>
        </div>
        {isLoading ? (
          <div className="secret-posts loading">
            <p>Loading...</p>
          </div>
        ) : (
          <div
            className="secret-posts"
            style={bioItems.length === 0 ? { padding: '0 20px' } : { padding: '20px' }}>
            {bioItems.length > 0 && bioItems.map((item, bioIndex) => (
              <div className="post" key={bioIndex}>
                <p>{item.message}</p>
                <button
                  type="button"
                  onClick={() => onBioDelete(bioIndex)}>
                  delete
                </button>
              </div>
            ))}
            {bioItems.length === 0 && (
              <div className="no-secrets">
                <p>No secrets yet...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
