import React, { useState } from "react";
import style from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { selectAllProducts } from "./products/productSlice";
import { BsFillCartFill } from "react-icons/bs";
const Navbar = ({ children }) => {
  const selectAllProduct = useSelector(selectAllProducts);
  const [counter, setCounter] = useState(0);
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
          <a href="#">
            <BsFillCartFill className={style.BsFillCartFill} />
            <span className={style.counter}>{selectAllProduct.length}</span>
          </a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
