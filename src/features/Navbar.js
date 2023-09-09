import React, { useState } from "react";
import style from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectItems } from "./cart/cartSlice";

const Navbar = ({ children }) => {
  const items = useSelector(selectItems);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

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
          {items.length > 0 && (
            <Link to="/cart">
              <BsFillCartFill className={style.BsFillCartFill} />
              <span className={style.counter}>{items.length}</span>
            </Link>
          )}
        </li>
        <li className={style.profileMenu}>
          <a  onClick={toggleProfileMenu} >
           <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="profile"/>
          </a>
          {isProfileMenuOpen && (
            <ul className={style.profileSubMenu}>
              <li>
                <Link to="/my-account">My Account</Link>
              </li>
              <li>
                <Link to="/orders">My Orders</Link>
              </li>
              <li>
                <Link to="/sign-out">Sign Out</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
