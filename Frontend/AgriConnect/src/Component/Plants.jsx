import React, { useEffect, useState } from "react";
import style from "../CSS/Plants.module.Css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineGridView } from "react-icons/md";
import Slider from "react-slider";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import Pagination from "../Component/Pagination";

const MIN = 1000;
const MAX = 20000;
const Plants = () => {
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [price, setPrice] = useState([MIN, MAX]);

  const getAllData = async (pageno) => {
    let res = await fetch(
      `http://localhost:8080/plants/load?offset=${pageno}&limit=12`
    );
    let response = await res.json();
    setData(response);
    console.log(response);
  };

  const handleSortChange = async (event) => {
    let url = "http://localhost:8080/plants/load";
    //console.log("change");
    console.log(event.target.value);
    let SortValue = event.target.value;
    if (SortValue === "Alphabetically, A-Z") {
      url = url + `/A-Z?offset=1&limit=12`;
      console.log(url);
    } else if (SortValue === "Alphabetically, Z-A") {
      url = url + `/Z-A?offset=1&limit=12`;
      console.log(url);
    } else if (SortValue === "Price, Low-High") {
      url = url + `/Low_to_High?offset=1&limit=12`;
      console.log(url);
    } else if (SortValue === "Price, High-Low") {
      url = url + `/High_to_Low?offset=1&limit=12`;
      console.log(url);
    } else if (SortValue === "Featured") {
      url = url + `?offset=1&limit=12`;
      console.log(url);
    }

    let res = await fetch(url);
    let response = await res.json();
    setData(response);
    console.log(response);
  };
  const HandleIncrement = () => {
    setPage(page + 1);
  };
  const HandleDecrement = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    getAllData(page);
    handleSortChange();
  }, [page]);
  return (
    <div id={style.PlantParent}>
      <Breadcrumb
        spacing="2px"
        size={"lg"}
        separator={<ChevronRightIcon color="grey" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            fontWeight="500"
            fontSize="23px"
            color="rgb(116,193,20)"
            textDecoration={"none"}
            as={Link}
            to="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/plant"
            fontWeight="500"
            fontSize="23px"
            color="grey"
            textDecoration={"none"}
            isCurrentPage
          >
            Plants
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 className={style.PlantsHeading}>Plants</h1>
      <section id={style.childContainerPlants}>
        <div className={style.leftChildSection}>
          <h1 className={style.FiltersHead}>Filters</h1>
          <div className={style.PriceContainer}>
            <h2>Price</h2>
            <div className={style.PriceValue}>
              <h4>Rs. 1234</h4>
              <h4>-</h4>
              <h4>Rs. 1234</h4>
            </div>
            <h4>
              Current Range:<span>Rs. 123</span>
            </h4>
            <div></div>
          </div>
        </div>
        <div className={style.rightChildSection}>
          <div className={style.SortView}>
            <div>
              <label>Sort By</label>
              <select onChange={handleSortChange}>
                <option>Featured</option>
                <option>Alphabetically, A-Z</option>
                <option>Alphabetically, Z-A</option>
                <option>Price, Low-High</option>
                <option>Price, High-Low</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
              <p>View as</p>
              <button>
                <GoListUnordered size={25} />
              </button>
              <button>
                <MdOutlineGridView size={25} />
              </button>
            </div>
          </div>

          <div className={style.PlantContainer}>
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
                    <button className={style.CartButton}>Add To Cart</button>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            page={page}
            HandleDecrement={HandleDecrement}
            HandleIncrement={HandleIncrement}
          />
        </div>
      </section>
    </div>
  );
};

export default Plants;
