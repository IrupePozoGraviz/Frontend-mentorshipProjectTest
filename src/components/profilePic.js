/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from './Utils';

export const Picture = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector((store) => store.user.userId);
  let accessToken = useSelector((store) => store.user.accessToken);
  accessToken = !accessToken && localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfilePic = async () => {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL('user/647edebae2a9928a0dcf623d/profile-picture'), options);
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

  /*  useEffect(() => { console.log(profilePicture) }, [profilePicture]) */

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken
        },
        body: formData
      };
      const response = await fetch(API_URL('user/647edebae2a9928a0dcf623d/upload-profile-picture'), options);
      if (response.ok) {
        console.log('Profile picture uploaded successfully!');
        setProfilePicture(URL.createObjectURL(selectedFile));
      } else {
        console.log('Failed to upload profile picture:');
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
    }
  };

  const deleteProfilePic = async () => {
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: accessToken
        },
        body: formData
      };
      const response = await fetch(API_URL('user/647edebae2a9928a0dcf623d/delete-profile-picture'), options);
      if (response.ok) {
        console.log('Profile picture deleted successfully!');
        setProfilePicture(null);
      } else {
        console.log('Failed to delete profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error deleting profile picture:', error);
    }
  };

  return (
    <div>
      <h2>Profile Picture</h2>
      {profilePicture && <img src={profilePicture} alt="Profile" style={{ width: 200, height: 300 }} />}
      <input type="file" onChange={handleFileChange} />
      <button type="submit" onClick={uploadProfilePic}>Upload Picture</button>
      <button type="submit" onClick={deleteProfilePic}>Delete Picture</button>
    </div>
  );
};
