import React, { useContext, useEffect, useState } from "react";
import { ContextApi } from "../Context/AgriConnectContext";
import style from "../CSS/Cart.module.css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const Cart = () => {
  let [price, setPrice] = useState(0);
  let [subTotal, setSubTotal] = useState(0);
  let [tax, setTax] = useState(0);

  let { cart, setCart } = useContext(ContextApi);

  console.log(cart);
  const handleQuantity = (item, sym) => {
    console.log(item, " ", sym);
  };
  const handlePrice = () => {
    let ans = 0;
    cart.map((ele) => {
      const Price = JSON.parse(ele.pprice);
      ans += ele.pquantity * Price[0].SP;
    });
    setPrice(ans);
    setTax(ans * 0.18);
  };
  const handleTotal = () => {
    let val = price + tax + 100;
    setSubTotal(val);
  };
  const handleRemove = (id) => {
    const arr = cart.filter((ele) => ele.pid !== id);
    setCart(arr);
  };

  useEffect(() => {
    handlePrice();
    handleTotal();
  }, [handleRemove, handleTotal]);
  return (
    <div id={style.CartParent}>
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
            Cart
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <h1>Your Shopping Cart</h1>
      <div className={style.CartChild}>
        {cart.length === 0 ? (
          <h1 style={{ color: " rgb(116,193,20)" }}>
            Cart is Empty please Add Plants
          </h1>
        ) : (
          <div className={style.LeftSection}>
            {cart.map((ele, ind) => {
              const images = JSON.parse(ele.pimages);
              const Price = JSON.parse(ele.pprice);
              return (
                <div className={style.ProductContainer}>
                  <img src={images[0].IMG1} alt="error" />
                  <div className={style.PriceTitle}>
                    <h4>{ele.ptitle}</h4>
                    <h3 style={{ margin: "auto" }}>
                      {" "}
                      Price Rs. {Price[0].MP} Rs.<span>{Price[0].SP}</span>
                    </h3>
                  </div>
                  <div style={{ marginTop: "35px" }}>
                    <h5 style={{ color: "grey" }}>Quantity</h5>
                    <div className={style.Quantity}>
                      <button
                        disabled={ele.pquantity === 1}
                        onClick={() => {
                          handleQuantity(ele, -1);
                        }}
                      >
                        <FaMinus />
                      </button>
                      <button>{ele.pquantity}</button>
                      <button
                        onClick={() => {
                          handleQuantity(ele, +1);
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <h4>Rs. {ele.pquantity * Price[0].SP}</h4>
                  <button
                    onClick={() => {
                      handleRemove(ele.pid);
                    }}
                    className={style.DeleteButton}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {cart.length === 0 ? (
          ""
        ) : (
          <div className={style.RightSection}>
            <h2>Summary</h2>
            <h4>Estimating Shoping and tax</h4>
            <hr />
            <div>
              <div className={style.SummaryChild}>
                <h5>Sub-Total:</h5>
                <h5>Rs. {price}</h5>
              </div>
              <div className={style.SummaryChild}>
                <h5>GST Taxes @ (18%):</h5>
                <h5>Rs. {tax}</h5>
              </div>
              <div className={style.SummaryChild}>
                <h5>Shipping:</h5>
                <h5>Rs. 100</h5>
              </div>
              <hr />
              <div className={style.SummaryChild}>
                <h5>Order Total:</h5>
                <h5>Rs. {subTotal}</h5>
              </div>
              <div className={style.SummaryChild}>
                <h5>Total After Discount:</h5>
                <h5>Rs. {subTotal}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
