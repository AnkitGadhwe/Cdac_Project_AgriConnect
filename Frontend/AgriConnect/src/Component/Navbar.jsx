import React, { useContext, useState } from "react";
import style from "../CSS/Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Imagelogo from "../Images/Imagelogo.png";
import { ContextApi } from "../Context/AgriConnectContext";
const Navbar = () => {
  let [state, setState] = useState("");
  let { cart } = useContext(ContextApi);
  let CartLength = cart.length;
  const handleClick = () => {
    console.log(state);
  };
  return (
    <nav id={style.navbar}>
      <section id={style.upperSection}>
        {/* <img src=""https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7IX4u2CC61VqeUvaNEOj6zyXXJPRHbJa4g&usqp=CAU"" alt="webLogo" /> */}
        <img className={style.navImage} src={Imagelogo} alt="webLogo" />

        <div className={style.searchDiv}>
          <input
            onChange={(e) => {
              setState(e.target.value);
            }}
            className={style.searchInput}
            type="text"
            placeholder="What are you looking for?"
          />
          <button className={style.searchButton} onClick={handleClick}>
            <FaSearch />
          </button>
        </div>

        <div className={style.searchDiv}>
          <CiUser size={30} />
          <NavLink to="/login">
            <button className={style.loginButton}>Login</button>
          </NavLink>
        </div>

        <div className={style.searchDiv}>
          <div className={style.buttonContainer}>
            {" "}
            <button className={style.quantity}>{CartLength}</button>
            <NavLink to="/cart">
              <button className={style.cartButton}>
                <FaCartShopping size={33} />
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <section id={style.belowSection}>
        <NavLink className={style.link} to="/">
          Home
        </NavLink>
        <NavLink className={style.link} to="/plant">
          Plants
        </NavLink>
        <NavLink className={style.link} to="/potplants">
          PotPlants
        </NavLink>

        <NavLink className={style.link} to="/plantfood">
          PlantsFood
        </NavLink>

        <NavLink className={style.link} to="/pumpspray">
          Pump&Sprays
        </NavLink>

        <NavLink className={style.link} to="/contact">
          Contact
        </NavLink>
      </section>
    </nav>
  );
};

export default Navbar;
