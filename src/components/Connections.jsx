import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log("Fetched connections:", res.data.data);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div className="text-center mt-10">Loading...</div>;

  if (connections.length === 0)
    return <h1 className="text-center mt-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photo, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              {photo ? (
                <img
                  alt="User"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photo}
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-400">{age}, {gender}</p>
              )}
              <p>{about}</p>
            </div>

            <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
