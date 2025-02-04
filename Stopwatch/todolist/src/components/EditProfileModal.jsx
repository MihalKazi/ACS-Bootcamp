import React, { useState } from 'react';
import { updateProfile } from '../api';

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { name, email, bio, profilePicture };
    const response = await updateProfile(updatedProfile);
    onUpdate(response); // Notify parent component of the update
    onClose(); // Close the modal
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

      // Upload image to Cloudinary
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();
      setProfilePicture(cloudinaryData.secure_url); // Set the uploaded image URL
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;