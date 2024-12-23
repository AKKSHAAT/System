import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [msg, setMsg] = useState(null);

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", {
        email,
        password,
        lastName,
        firstName,
      });
      if (res.status === 200) {
        navigate("/login");
      }

      console.log(res.data);
    } catch (err) {
      console.log("err: ",err);
      if (err.status === 400) {
        setMsg(err.response.data.msg)
      }
    }
  };
  return (
    <div className=" flex flex-col w-60 mx-auto">
      <h1 className="text-3xl font-semibold text-slate-700 text-center my-4">
        Register
      </h1>
      {msg && (
        <p className="text-md font-semibold text-red-500 text-center my-1">
          {msg}
        </p>
      )}
      <input
        className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
        type="firstName"
        placeholder="First name"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className=" bg-slate-50 border-2 border-slate-200 p-2 my-1 rounded"
        type="lastName"
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
      />
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
        onClick={handleRegister}
      >
        Register
      </button>
      <p>
        Alredy A User ?{" "}
        <Link className="text-blue-600" to={"/login"}>
          {" "}
          login
        </Link>
      </p>
    </div>
  );
};
