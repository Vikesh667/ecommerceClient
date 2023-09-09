import React, { useState } from "react";
import style from "../styles/Checkout.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateItemsAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder, selectCurrentOrderStatus } from "../features/orders/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const currentOrder=useSelector(selectCurrentOrder)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateQuantity = (item, increment) => {
    const updatedItem = {
      ...item,
      quantity: item.quantity + (increment ? 1 : -1),
    };
    dispatch(updateItemsAsync(updatedItem));
  };

  const removeItem = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user,
      paymentMethod,
      selectedAddress,
      status:"pending"
    };
    dispatch(createOrderAsync(order));
  };
  return (
    <div className={style.container}>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
      <form
        className={style.form}
        noValidate
        onSubmit={handleSubmit((data) => {
          dispatch(
            updateUserAsync({ ...user, addresses: [...user.addresses, data] })
          );
          reset();
        })}
      >
        <p>Personal Information</p>
        <div className={style.firstlastname}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div className={style.emailfiled}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Eamil is required" })}
          />
        </div>
        <div className={style.street}>
          <label htmlFor="street">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: "Phone is required" })}
          />
        </div>
        <div className={style.street}>
          <label htmlFor="street">Street address</label>
          <input
            type="text"
            id="street"
            {...register("street", { required: "Street is required" })}
          />
        </div>
        <div className={style.address}>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              {...register("city", { required: "City is required" })}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              {...register("state", { required: "State is required" })}
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              {...register("pinCode", { required: "Pin-code  is required" })}
            />
          </div>
        </div>
        <div className={style.save}>
          <button className={style.cancel}>Reset</button>
          <button>Add Address</button>
        </div>
        <div className={style.addressContainer}>
          <h3>Addresses</h3>
          <p>Choose from Existing addresses</p>
          <ul>
            {user.addresses.map((address, index) => (
              <li key={index}>
                <div className={style.vikesh}>
                  <span>
                    <input
                      onChange={handleAddress}
                      type="radio"
                      name="address"
                      value={index}
                    />
                  </span>
                  <span>
                    <p>{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                  </span>
                </div>
                <div>
                  <p>Phone:{address.phone}</p>
                  <p>{address.pinCode}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.paymentContainer}>
          {" "}
          {/* Use the styles object */}
          <div>
            <h4>Payment Method</h4>
            <p>Choose one</p>
          </div>
          <div className={style.paymentOption}>
            <input
              type="radio"
              name="paymentmethod"
              value="cash"
              onChange={handlePayment}
              checked={paymentMethod === "cash"}
            />
            <label>Cash Payment</label>
          </div>
          <div className={style.paymentOption}>
            <input
              type="radio"
              name="paymentmethod"
              value="card"
              onChange={handlePayment}
              checked={paymentMethod === "card"}
            />
            <label>Card Payment</label>
          </div>
        </div>
      </form>
      <div className={style.cartcontainer}>
        <h2>Your Cart</h2>
        {!items.length && <Navigate to="/" replace={true}></Navigate>}
        <div className={style.cartitems}>
          {items.map((item) => (
            <div key={item.id} className={style.cartitem}>
              <div className={style.productinfo}>
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className={style.productimage}
                />
                <div className={style.productdetails}>
                  <p>{item.title}</p>
                  <p>{item.brand}</p>
                  <div className={style.quantity}>
                    <button
                      className={style.quantityButton}
                      onClick={() => updateQuantity(item, false)}
                    >
                      -
                    </button>
                    <span className={style.quantityValue}>{item.quantity}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => updateQuantity(item, true)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.remove}>
                <p>${item.price}</p>
                <button
                  className={style.removebtn}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.total}>
          <div>
            <h4>Subtotal</h4>
            <h4>Totals item in Cart</h4>
            <p>Shiping and texes calculated and checkeout</p>
          </div>
          <span>
            <p>${totalAmount}</p>
            <p>{totalItems} items</p>
          </span>
        </div>
        <div className={style.checkoutButton}>
          <button onClick={handleOrder}>Order now</button>
        </div>
        <p className={style.shoping}>
          <Link to="/">Continue shoping ...</Link>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
