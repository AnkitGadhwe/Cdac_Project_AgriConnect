import React, { useState } from "react";

function Registeration() {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    EMailid: "",
    Address: "",
    Pincode: "",
    State: "",
    Gender: "",
    WhatsApp_Number: "",
    UserPassword: "",
  });
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formBody = Object.keys(formData)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
      )
      .join("&");

    fetch("http://localhost:8080/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.startsWith("Registration_Failed")) {
          setError(data);
          setUserId("");
        } else {
          setError("");
          setUserId(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while processing your request.");
        setUserId("");
      });
  };

  return (
    <div>
      <h2>Data Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="Firstname"
            value={formData.Firstname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="Lastname"
            value={formData.Lastname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="EMailid"
            value={formData.EMailid}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            name="Pincode"
            value={formData.Pincode}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          WhatsApp Number:
          <input
            type="text"
            name="WhatsApp_Number"
            value={formData.WhatsApp_Number}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="UserPassword"
            value={formData.UserPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {error && <p>{error}</p>}
      {userId && <p>User ID: {userId}</p>}
    </div>
  );
}

export default Registeration;
