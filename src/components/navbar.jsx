import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { removeuser } from '../utils/userslice';


const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const defaultAvatar = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const userAvatar = user?.photo || defaultAvatar;
  console.log(userAvatar);
  console.log(user?.firstName);
const handleLogout=async()=>{
  try {

 await axios.post("http://localhost:3000/auth/logout",{},{withCredentials:true});
 dispatch(removeuser());
 navigate("");
  }
  catch(err){
 console.log(err);
  }
  
}
  return (
    <div className="navbar bg-primary shadow-sm sticky top-0 z-50 text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">Let's Connect</a>
      </div>

  <div className="flex gap-4 pr-4">
     <Link to="/feed">Home</Link>
      </div>
      
 <div className="flex gap-4 pr-4">
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="flex items-center gap-4 pr-4">
       

        <span>{user?.firstName || "Guest"}</span>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={userAvatar} />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connections">Connections</Link></li>
             <li><Link to="/requests">Requests</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
