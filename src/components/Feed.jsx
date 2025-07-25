import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './userCard';

const Feed = () => {
   console.log("Feed endpoint hit!");
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
   
    try {
      const res = await axios.get( "http://localhost:3000/users/user/feed", {
        withCredentials: true,
      });
      console.log("yvdsthm");

      dispatch(addFeed(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
     console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;