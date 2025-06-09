import React from 'react';
import EditCard from './EditCard';
import { useSelector } from 'react-redux';

const Profile = () => {
  const Userdata = useSelector((store) => store.user);
  console.log(Userdata);

  return (Userdata&& (
    <div>
      <EditCard user={Userdata} />
    </div>)
  );
};

export default Profile;
