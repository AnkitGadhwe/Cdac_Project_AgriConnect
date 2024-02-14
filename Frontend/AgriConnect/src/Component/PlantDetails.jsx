import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "../CSS/PlantDetail.module.css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const PlantsDetails = () => {
  let { pid } = useParams();
  let [data, setData] = useState({});
  let [stock, setStock] = useState(false);

  const getSingleData = async () => {
    let res = await fetch(`http://localhost:8080/plants/${pid}`);
    let response = await res.json();
    setData(response);
    console.log(response);
  };
  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div id={style.ProductDetailParent}>
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
            color="rgb(116,193,20)"
            textDecoration={"none"}
          >
            Plants
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/plantdetails/:pid"
            fontWeight="500"
            fontSize="23px"
            color="grey"
            textDecoration={"none"}
            isCurrentPage
          >
            PlantsDetail
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className={style.ProductDetailChild}>
        <div className={style.LeftSection}>
          <Carousel className={style.Carousel}>
            <div>
              <img
                src={
                  data.pimages && data.pimages.length > 0
                    ? JSON.parse(data.pimages)[0].IMG1
                    : ""
                }
                alt="Product"
              />
            </div>
            <div>
              <img
                src={
                  data.pimages && data.pimages.length > 0
                    ? JSON.parse(data.pimages)[0].IMG2
                    : ""
                }
                alt="Product"
              />
            </div>
            <div>
              <img
                src={
                  data.pimages && data.pimages.length > 0
                    ? JSON.parse(data.pimages)[0].IMG3
                    : ""
                }
                alt="Product"
              />
            </div>
          </Carousel>
        </div>

        <div className={style.RightSection}>
          <h2>{data.ptitle}</h2>
          <div className={style.Sale}>
            <p>sale</p>
            <h2 className={style.Saleh2}>
              Rs.
              {data.pprice && data.pprice.length > 0
                ? JSON.parse(data.pprice)[0].MP
                : ""}
            </h2>
            <h2 style={{ color: "rgb(77,169,71)" }}>
              Rs.{" "}
              {data.pprice && data.pprice.length > 0
                ? JSON.parse(data.pprice)[0].SP
                : ""}
            </h2>
          </div>
          <div className={style.Rating}>
            <FaStar color="rgb(246,195,71)" />
            <FaStar color="rgb(246,195,71)" />
            <FaStar color="rgb(246,195,71)" />
            <FaStar color="rgb(246,195,71)" />
            <FaStarHalfAlt color="rgb(246,195,71)" />
            <p>{data.prating}</p>
          </div>
          <p>{data.pdescription}</p>

          <div className={style.QuantityCart}>
            <div className={style.Quantity}>
              <p>Quantity</p>
              <div>
                <button>
                  <FaMinus />
                </button>
                <button>1</button>
                <button>
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className={style.Cart}>
              <button>Add to Cart</button>
            </div>
          </div>
          <button className={style.BuyNow}>
            <h2>Buy It Now</h2>
          </button>

          <div className={style.PlantInformation}>
            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/emoji/2x/house-emoji.png"
                alt="error"
              />
              <p>Indoor Plants</p>
            </div>
            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/cute-clipart/2x/water.png"
                alt="error"
              />
              <p>Needs Minimal Watering</p>
            </div>

            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/office/2x/soil.png"
                alt="error"
              />
              <p>Moist Soil</p>
            </div>
            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/color/3x/smiling-face-with-heart.png"
                alt="error"
              />
              <p>Low Maintenance</p>
            </div>

            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/plasticine/2x/soil.png"
                alt="error"
              />
              <p>Well Drained Soil</p>
            </div>
            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/color/3x/air-element.png"
                alt="error"
              />
              <p>Air Purifying</p>
            </div>

            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/color/3x/no-animals.png"
                alt="error"
              />
              <p>Do not eat me!</p>
            </div>

            <div className={style.Infocontainer}>
              <img
                src="https://img.icons8.com/444444/color/3x/grass.png"
                alt="error"
              />
              <p>Ornamental Plant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantsDetails;
