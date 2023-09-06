import React, { useState } from "react";
import style from "../../styles/Cart.module.css";
import { Link } from "react-router-dom";

export function Cart() {
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
      <button >Checkout</button>
      </div>
      <p className={style.shoping}>
        <Link to="/">Continue shoping ...</Link>
      </p>
    </div>
  );
}
