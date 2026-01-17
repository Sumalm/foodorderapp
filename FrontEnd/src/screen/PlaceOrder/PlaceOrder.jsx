import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItem, food_list, url, token } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItem[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else {
        console.error("Stripe session URL missing");
      }
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 20;
  const total = getTotalCartAmount() + deliveryFee;

  return (
    <div className="place-order">
      <div className="delivery-info">
        <h2>Delivery Information</h2>

        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <input required name="firstName" placeholder="First Name" value={data.firstName} onChange={onChangeHandler} />
            <input required name="lastName" placeholder="Last Name" value={data.lastName} onChange={onChangeHandler} />
          </div>

          <input required type="email" name="email" placeholder="Email" value={data.email} onChange={onChangeHandler} />
          <input required name="street" placeholder="Street" value={data.street} onChange={onChangeHandler} />

          <div className="row">
            <input required name="zipCode" placeholder="Zip Code" value={data.zipCode} onChange={onChangeHandler} />
            <input required name="country" placeholder="Country" value={data.country} onChange={onChangeHandler} />
          </div>

          <input required name="phone" placeholder="Phone" value={data.phone} onChange={onChangeHandler} />
        </form>
      </div>

      <div className="cart-totals">
        <h2>Cart Totals</h2>

        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>

        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{deliveryFee}</p>
        </div>

        <div className="cart-total-details">
          <p>Total</p>
          <p>₹{total}</p>
        </div>

        <button onClick={onSubmitHandler}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
