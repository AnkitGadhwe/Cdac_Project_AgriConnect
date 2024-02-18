import React, { useState } from "react";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const formBody = new URLSearchParams();
      formBody.append("Password", formData.newPassword);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
        credentials: "include", // Include cookies in the request
      };

      const response = await fetch(
        "http://localhost:8080/Update_Password",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log("Password updated successfully");
          setError(""); // Clear any previous error
          setFormData({ newPassword: "", confirmNewPassword: "" }); // Clear form fields
        } else {
          setError("Failed to update password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <h2>New Password Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewPassword;
