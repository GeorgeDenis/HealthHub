import React from 'react'
import { useUser } from '@/context/LoginRequired';
import { useParams } from 'react-router-dom';

const ProfileCard = ({userData}) => {
  const currentUser = useUser();
  const {userId} = useParams();
  const isOwnProfile = userId === currentUser.userId || !userId;
  return (
    <div>ProfileCard</div>
  )
}

export default ProfileCard