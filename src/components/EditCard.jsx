import React, { useState } from 'react';
import UserCard from './userCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { adduser } from '../utils/userslice';

const EditCard = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photo, setphoto] = useState(user.photo);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [error, seterror] = useState("");
  const [toast, settoast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    if (!firstName || !lastName || !photo || !age) {
      seterror("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/update",
        {
          firstName,
          lastName,
          photo,
          age: Number(age),
          gender,
          about,
        },
        { withCredentials: true }
      );
console.log(res.data);
      dispatch(adduser(res.data));
      seterror(""); 
      settoast(true);

      // Hide toast after 3 seconds
      setTimeout(() => settoast(false), 3000);

    } catch (err) {
      seterror(err.message || "An error occurred while updating profile.");
    }
  };
  

  return (
    <>
     {toast && (
        <div className="alert alert-success w-96 mx-auto">
          <span>Profile updated successfully!</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center gap-6 my-10">
        {/* Edit Profile Card */}
        <div className="card card-border bg-info-content w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>

            <div>
              <label htmlFor="firstName" className="block font-bold mb-1">First Name:</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block font-bold mt-4 mb-1">Last Name:</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>

            <div>
              <label htmlFor="photo" className="block font-bold mt-4 mb-1">Photo URL:</label>
              <input
                id="photo"
                type="text"
                value={photo}
                onChange={(e) => setphoto(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>

            <div>
              <label htmlFor="age" className="block font-bold mt-4 mb-1">Age:</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setage(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block font-bold mt-4 mb-1">Gender:</label>
              <input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>
             <div>
              <label htmlFor="age" className="block font-bold mt-4 mb-1">About:</label>
              <input
                id="age"
                type="text"
                value={about}
                onChange={(e) => setabout(e.target.value)}
                className="input w-full"
                placeholder="Type here"
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* UserCard Side by Side */}
        <div>
          <UserCard user={{ firstName, lastName, photo, age, gender,about }} />
        </div>
      </div>

      {/* Success Toast Message */}
     
    </>
  );
};

export default EditCard;
