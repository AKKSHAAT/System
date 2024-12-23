import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/test@email.com"
        );
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  if (error) return <div className="text-center">{error} <Link className="text-blue-600" to={'/login'}>login</Link></div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-slate-700 text-center my-4">
        Dashboard
      </h1>
      <div className="px-auto text-center">
        <p>First Name: {userData.firstName}</p>
        {userData.lastName && <p>Last Name: {userData.lastName}</p>}
        <p>Email: {userData.email}</p>
        <Link className='text-blue-600' to={"/change-password"}> Change Password</Link>
      </div>
    </div>
  );
};

export default Dashboard;
