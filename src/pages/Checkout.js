import React, { useState } from "react";
import style from "../styles/Checkout.module.css";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 25,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Product 2",
      price: 30,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxKR-dloNTZ5MJyEBpPuHDvp65Uon-NcUqDj0y9mV&s", // Replace with actual image URL
    },
    // Add more items as needed
  ]);
  const addresses = [
    {
      name: "vikesh kumar",
      street: "katalpur",
      city: "Siwan",
      pinCode: 841439,
      state: "Bihar",
      phone: 53535353535,
    },
    {
      name: "Kishan kumar",
      street: "Gorakh pur",
      city: "Gorakhpur",
      pinCode: 841939,
      state: "Up",
      phone: 89880808080,
    },
  ];
  const updateQuantity = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  return (
    <div className={style.container}>
      <form className={style.form}>
        <p>Personal Information</p>
        <div className={style.firstlastname}>
          <span>
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" />
          </span>
          <span>
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" />
          </span>
        </div>

        <div className={style.emailfiled}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={style.select}>
          <label htmlFor="country">Country</label>
          <select id="country" name="country">
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>
        <div className={style.street}>
          <label htmlFor="street-address">Street address</label>
          <input type="text" id="street-address" name="street-address" />
        </div>
        <div className={style.address}>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" />
          </div>
          <div>
            <label htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" name="pincode" />
          </div>
        </div>
        <div className={style.save}>
          <button  className={style.cancel}>Reset</button>
          <button>Add Address</button>
        </div>
        <div className={style.addressContainer}>
          <h3>Addresses</h3>
          <p>Choose from Existing addresses</p>
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>
                <div className={style.vikesh}>
                  <span>
                  <input type="radio" name="address"/>
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
            <input type="radio" name="payment-method" value="cash" />
            <label>Cash Payment</label>
          </div>
          <div className={style.paymentOption}>
            <input type="radio" name="payment-method" value="card" />
            <label>Card Payment</label>
          </div>
        </div>
       
      </form>
      <div className={style.cartcontainer}>
        <h2>Your Cart</h2>
        <div className={style.cartitems}>
          {cartItems.map((item) => (
            <div key={item.id} className={style.cartitem}>
              <div className={style.productinfo}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.productimage}
                />
                <div className={style.productdetails}>
                  <p>{item.name}</p>
                  <div className={style.quantity}>
                    <button
                      className={style.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className={style.quantityValue}>{item.quantity}</span>
                    <button
                      className={style.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
            <p>Shiping and texes calculated and checkeout</p>
          </div>
          <p>Total: ${getTotalPrice()}</p>
        </div>
        <div className={style.checkoutButton}>
          <button>pay and order</button>
        </div>
        <p className={style.shoping}>
          <Link to="/">Continue shoping ...</Link>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
