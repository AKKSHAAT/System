import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState(null);
const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      if(res.status===200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.username,); 
        navigate('/');
      }
    } catch (err) {
      console.log("err: ", err);
      if(err.status === 400) {
        console
        setMsg(err.response.data.msg);
      }
    }
  };
  return (
    <div className=" flex flex-col w-60 mx-auto">
    <h1 className="text-3xl font-semibold text-slate-700 text-center my-4">Login</h1>
    <p className="text-md font-semibold text-blue-700 text-center my-1">{msg}</p>
      
      <input
        className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
        type="email "
        placeholder="example@email.com"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
        type="password"
        placeholder="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className=" bg-blue-400 text-white font-semibold p-2 my-1 rounded-lg"
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        New Here ?<Link className='text-blue-600' to={"/register"}> Register</Link>
      </p>
    </div>
  );
};

