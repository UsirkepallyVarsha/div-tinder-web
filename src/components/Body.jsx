import React, { useEffect } from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../utils/userslice.js'; // fixed: should be `adduser` not `addUser`
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const userData =useSelector((store)=>store.user);
  const fetchUser = async () => {
    if(userData)return;
    try {
      const res = await axios.get("http://localhost:3000/profile/view", { withCredentials: true });
      dispatch(adduser(res.data.data));
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn("Not logged in. Redirecting to login.");
        navigate("/login");
      } else {
        console.error("Fetch user failed:", err);
      }
    }
  };

  useEffect(() => {
   
   fetchUser();
    
  
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
