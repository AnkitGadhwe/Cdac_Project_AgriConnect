import React, { useState, useEffect } from "react";
import Slideshow from "./Slideshow";
import style from "../CSS/Home.module.css";
import f1 from "../Images/Feature/f1.png";
import f2 from "../Images/Feature/f2.png";
import f6 from "../Images/Feature/f6.png";

import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const Home = () => {
  let [data, setData] = useState([]);

  const getAllData = async () => {
    let res = await fetch("http://localhost:8080/plants/load?offset=3&limit=5");
    let response = await res.json();
    setData(response);
    console.log(response);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div style={{ marginTop: "0px" }}>
      <Slideshow />
      {/* Features Section */}
      <div>
        {" "}
        <h2 className={style.sectionHeading}>What Sets Us Apart !</h2>
        <section id={style.featuresParent}>
          <div className={style.featureBox}>
            <img src={f1} alt="f1-img" />
            <h5>Free Shipping</h5>
          </div>
          <div className={style.featureBox}>
            <img src={f2} alt="f2-img" />
            <h5>Online Order</h5>
          </div>
          <div className={style.featureBox}>
            <img
              src="https://kumaunplants.com/cdn/shop/files/high_quality-01.svg?v=1677842047&width=710"
              alt="f3-img"
            />
            <h5>Quality Assurance</h5>
          </div>
          <div className={style.featureBox}>
            <img
              src="https://kumaunplants.com/cdn/shop/files/price_a2651f3a-329f-4182-898d-f61b90581a57.svg?v=1677903733&width=710"
              alt="f4-img"
            />
            <h5>Best Price</h5>
          </div>
          <div className={style.featureBox}>
            <img
              src="https://kumaunplants.com/cdn/shop/files/packed_15bb90be-3837-42f4-9820-5b4d996eb655.svg?v=1677568686&width=710"
              alt="f5-img"
            />
            <h5>Secured Packaging</h5>
          </div>
          <div className={style.featureBox}>
            <img src={f6} alt="f6-img" />
            <h5>24/7 Support</h5>
          </div>
        </section>
        <section id={style.sectionBanner}>
          <div
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <NavLink to="/plantfood">
              {" "}
              <button className={style.PlantFoodPoster}>
                {/* <h1>Plant Food</h1>
                <p>
                  Choose from a wide range of organic, chemical fertilizers and
                  other growing media
                </p> */}
              </button>
            </NavLink>
            <NavLink to="/plantfood">
              {" "}
              <button className={style.PlantFoodPoster}>
                {/* <h1>Plant Food</h1>
                <p>
                  Choose from a wide range of organic, chemical fertilizers and
                  other growing media
                </p> */}
              </button>
            </NavLink>
          </div>
          <div
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          >
            <NavLink to="/pebbles">
              <button className={style.PlantFoodPoster2}></button>
            </NavLink>
            <NavLink to="/potplants">
              {" "}
              <button className={style.PlantFoodPoster3}></button>
            </NavLink>
            <NavLink to="/pumpspray">
              {" "}
              <button className={style.PlantFoodPoster4}></button>
            </NavLink>
          </div>
        </section>
        <section id={style.featureCollection}>
          <h1>Featured collection</h1>
          <div className={style.featureCollectionChild}>
            {data.map((ele, ind) => {
              const images = JSON.parse(ele.pimages);
              const Price = JSON.parse(ele.pprice);
              return (
                <div className={style.PlantCard}>
                  <img src={images[0].IMG1} alt="error" />
                  <h5>Rs. {Price[0].MP}</h5>
                  <h3>Rs. {Price[0].SP}</h3>
                  <p>{ele.ptitle}</p>
                  <div className={style.ButtonBox}>
                    <NavLink to={`/plantsdetails/${ele.pid}`}>
                      <button className={style.QuickShop}>Quick Shop</button>
                    </NavLink>
                    <button className={style.CartButton}>
                      <FaCartPlus />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <NavLink to="/plant">
            <button className={style.ViewAllButton}>View All</button>
          </NavLink>
        </section>
      </div>
    </div>
  );
};

export default Home;
