import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/change-password",
        {
          email: "test@email.com",
          oldPassword,
          newPassword,
        }
      );

      setMessage(response.data.message);
      setTimeout(()=>{
        navigate('/login')
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }, 1500)
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className=" flex flex-col w-60 mx-auto">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
            type="password"
            value={oldPassword}
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
            type="password"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          className=" bg-blue-400 text-white font-semibold p-2 my-1 mx-auto rounded-lg"
          type="submit"
        >
          Change Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
