import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextApi } from "../../../Context/AgriConnectContext";
export default function ServiceProviderLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  let { auth, setAuth } = useContext(ContextApi);

  // const [message, setMessage] = useState("Invalid Cerenditatial");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = await fetch(
      `http://localhost:8080/Login?UseriD=${formData.username}&Upass=${formData.password}`
    );
    var response = await data.json();
    // console.log(response);
    // console.log(formData);
    if (response) {
      setAuth(true);
    }
    console.log(auth);
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ marginBottom: "10px" }}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Login
        </button>
      </form>
      <NavLink to="/registration">Registration</NavLink>
      <NavLink to="/forgotpassword">Forget Password</NavLink>
      {auth ? "Valid User" : "Invalid User"}
      {/* Render the message if it exists */}
    </div>
  );
}
