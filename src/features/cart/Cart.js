import React, { useState } from "react";
import style from "../../styles/Cart.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, selectItems, updateItemsAsync } from "./cartSlice";

export function Cart() {
  const dispatch=useDispatch()
  const items=useSelector(selectItems)
  const updateQuantity = (item,increment) => {
    const updatedItem = { ...item, quantity: item.quantity + (increment ? 1 : -1) };
    dispatch(updateItemsAsync(updatedItem))
  };

  const removeItem = (id) => {
    dispatch(deleteItemFromCartAsync(id))
  };
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0)
 const totalItems=items.reduce((total,item)=>item.quantity+total,0)

  return (
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
      <button >
       <Link to="/checkout">Checkout</Link> 
        </button>
      </div>
      <p className={style.shoping}>
        <Link to="/">Continue shoping ...</Link>
      </p>
    </div>
  );
}
