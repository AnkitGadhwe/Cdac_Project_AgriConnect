import React, { useContext, useState, useEffect } from "react";
import style from "../CSS/Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { ContextApi } from "../Context/AgriConnectContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoOptionsOutline } from "react-icons/io5";
import AgriLogoC from "../Images/AgriLogoC.jpg";
import Sidebar from "./SlideBar/Sidebar";

const Navbar = () => {
  let [state, setState] = useState("");
  let [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  let { cart } = useContext(ContextApi);
  let { auth, setAuth } = useContext(ContextApi);
  let navigate = useNavigate();

  const handleClick = async () => {
    console.log(state);
    try {
      let data = await fetch(`http://localhost:8080/Search?ItemName=${state}`);
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      let res = await data.json();
      console.log(res);
      console.log(res.ptitle);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., show a message to the user
    }
  };
  let CartLength = cart.length;
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  const handleLogout = async () => {
    const response = await axios.get("http://localhost:8080/Logout");
    console.log(response.data);
    setAuth(false);
    navigate("/");
  };
  const selectOption = (option) => {
    if (option === 1) {
      navigate("/ShowProfile");
    } else if (option === 2) {
      navigate("/EditAddress");
    } else {
      navigate("/Orders");
    }

    // Perform any action based on the selected option here
  };
  const toggleSidebar = (isOpen) => {
    setShowSidebar(isOpen);
    console.log(isOpen);
  };
  return (
    <div id={style.navbar}>
      {auth ? (
        <Sidebar isOpen={showSidebar} toggleMenu={toggleSidebar} />
      ) : null}
      <div style={{ display: "flex", gap: "50px" }}>
        <img
          className={style.navImage}
          src={AgriLogoC}
          alt="webLogo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={style.searchDiv}>
            <input
              onChange={(e) => {
                setState(e.target.value);
              }}
              className={style.searchInput}
              type="text"
              placeholder="What are you looking for?"
              list="title"
            />

            <button className={style.searchButton} onClick={handleClick}>
              <FaSearch />
            </button>
          </div>
          <div id={style.belowSection}>
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
              PumpSprays
            </NavLink>

            <NavLink className={style.link} to="/contact">
              Contact
            </NavLink>
          </div>
        </div>

        <div>
          {auth ? (
            <button className={style.loginButton} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className={style.loginButton}>Login</button>
            </NavLink>
          )}
        </div>
        <div style={{ marginTop: "11px", marginLeft: "5px" }}>
          <div className={style.searchDiv}>
            <div className={style.buttonContainer}>
              {" "}
              <button className={style.quantity}>
                {auth ? CartLength : 0}
              </button>
              <NavLink to="/cart">
                <button className={style.cartButton}>
                  <FaCartShopping size={33} />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
