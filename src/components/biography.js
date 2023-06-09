import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from './Utils';

const BioEditor = () => {
  const [bio, setBio] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  // const userId = useSelector((store) => store.user.userId);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL('bio'), options);
        const data = await response.json();

        if (data.success) {
          setBio(data.bio);
        }
      } catch (error) {
        console.error('An error occurred while fetching bio:', error);
      }
    };

    fetchBio();
  }, [accessToken]);

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bio })
      };
      const response = await fetch(API_URL('bio'), options);
      const data = await response.json();

      if (data.success) {
        console.log('Bio saved:', bio);
      } else {
        console.error('Failed to save bio:', data.error);
      }
    } catch (error) {
      console.error('An error occurred while saving bio:', error);
    }
  };

  return (
    <div className="bio-editor">
      <h2>Bio</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={bio}
          onChange={handleChange}
          placeholder="Write something about yourself..." />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BioEditor;
