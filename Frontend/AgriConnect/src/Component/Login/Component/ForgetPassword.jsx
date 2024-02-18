import React, { useState, useContext } from "react";
import { myFunction } from "./Sendotp";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextApi } from "../../../Context/AgriConnectContext";
const ForgetPassword = () => {
  let [state, setState] = useState({ contact: "", userid: "" });
  let { useDetail, setUserDetail } = useContext(ContextApi);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUserDetail({ mobileno: state.contact, userid: state.userid });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const { contact, userid } = state;
    setUserDetail({ mobileno: contact, userid });
    try {
      await myFunction(contact, userid);
      setState({ contact: "", userid: "" });
      navigate("/otp");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        mobile
        <input
          type="number"
          placeholder="mobile"
          onChange={handleChange}
          name="contact"
        />
        userid
        <input
          type="text"
          placeholder="user id"
          onChange={handleChange}
          name="userid"
        />
        <button>Send Otp</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
