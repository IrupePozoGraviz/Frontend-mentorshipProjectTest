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
  const [imageUrl, setImageUrl] = useState('');
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken) || localStorage.getItem('accessToken');

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

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('profilePicture', selectedFile);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      } else {
        console.log('No file or URL selected for upload.');
        return;
      }
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
        setProfilePicture(URL.createObjectURL(selectedFile));
      } else {
        console.log('Failed to upload profile picture:', response.status);
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
    }
  };

  const deleteProfilePic = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: accessToken
        }
      };
      const response = await fetch(API_URL(`user/${userId}/delete-profile-picture`), options);
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
    <div className="picture-container">
      <h2>Profile Picture</h2>
      {profilePicture && <img src={profilePicture} alt="Profile" />}
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={handleUrlChange} />
      <button className="upload" type="submit" onClick={uploadProfilePic}>Upload Picture</button>
      <button className="delete" type="submit" onClick={deleteProfilePic}>Delete Picture</button>
    </div>
  );
};
