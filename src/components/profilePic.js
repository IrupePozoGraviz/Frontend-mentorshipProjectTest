/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { API_URL } from './Utils';

export const Picture = ({ userId }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Added state for the selected file
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL(`user/${userId}/profile-picture`), options);
        if (response.ok) {
          const pictureBlob = await response.blob();
          const pictureUrl = URL.createObjectURL(pictureBlob);
          setProfilePicture(pictureUrl);
        } else {
          console.log('Failed to fetch profile picture:', response.status);
        }
      } catch (error) {
        console.log('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, [userId, accessToken]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile); // Append the selected file to the formData

      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken
        },
        body: formData
      };
      const response = await fetch(API_URL(`user/${userId}/upload-profile-picture`), options);
      if (response.ok) {
        console.log('Profile picture uploaded successfully!');
      } else {
        console.log('Failed to upload profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <h2>Profile Picture</h2>
      {profilePicture && <img src={profilePicture} alt="Profile" />}
      <input type="file" onChange={handleFileChange} /> {/* Added input element for file selection */}
      <button type="submit" onClick={uploadProfilePic}>Upload Picture</button>
    </div>
  );
};