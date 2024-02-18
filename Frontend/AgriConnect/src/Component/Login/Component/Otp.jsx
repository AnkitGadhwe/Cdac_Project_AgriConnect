import React, { useState } from "react";
import { useNavigate } from "react-router";
const Otp = () => {
  let [state, setState] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ans =
      state.num1 +
      state.num2 +
      state.num3 +
      state.num4 +
      state.num5 +
      state.num6;
    console.log(ans);
    console.log(typeof ans);
    console.log(state);

    var data = await fetch(`http://localhost:8080/Verify_Otp?OTP=${ans}`);
    var response = await data.json();
    console.log(response);
    if (response) {
      navigate("/newpassword");
    }
    setState({
      num1: " ",
      num2: " ",
      num3: " ",
      num4: " ",
      num5: " ",
      num6: " ",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="num1" onChange={handleChange} />
        <input type="number" name="num2" onChange={handleChange} />
        <input type="number" name="num3" onChange={handleChange} />
        <input type="number" name="num4" onChange={handleChange} />
        <input type="number" name="num5" onChange={handleChange} />
        <input type="number" name="num6" onChange={handleChange} />
        <button>Submit Otp</button>
      </form>
    </div>
  );
};

export default Otp;
