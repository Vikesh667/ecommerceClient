import React, { useState } from "react";
import style from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { selectAllProducts } from "./products/productSlice";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectItems } from "./cart/cartSlice";
const Navbar = ({ children }) => {
  const items=useSelector(selectItems)
  return (
    <nav className={style.navbar}>
      <div className={style.logo}>
        <h1>Logo</h1>
        <li>
          <a href="#">Home</a>
        </li>
      </div>
      <ul className={style.menu}>
        <li>
         { items.length >0 && <Link to="/cart">
            <BsFillCartFill className={style.BsFillCartFill} />
            <span className={style.counter}>{items.length}</span>
          </Link>}
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
