import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../api';
import EditProfileModal from '../components/EditProfileModal';
import '../styles/Profile.css';
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);
    };
    getProfile();
  }, []);

  // Handle profile update
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-details">
        <img
          src={profile.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-picture"
        />
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Bio: {profile.bio}</p>
        <button onClick={() => setIsEditModalOpen(true)}>Edit Profile</button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default ProfilePage;