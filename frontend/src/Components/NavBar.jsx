import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    function logout() {
        navigate('/login')
        localStorage.removeItem('token');
        localStorage.removeItem('name');
    }
  return (
    <nav className="flex justify-end px-4  py-2">
      {localStorage.getItem("name") ? (
        <>
          <Link className="text-blue-600 px-3" to={"/"}>
            {localStorage.getItem("name")}
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link className="text-blue-600 px-3" to={"/register"}>
            {" "}
            Register
          </Link>
          <Link className="text-blue-600" to={"/login"}>
            {" "}
            Login
          </Link>
        </>
      )}
    </nav>
  );
};
