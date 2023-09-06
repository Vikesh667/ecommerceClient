import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { HiOutlineMail, HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import style from "../../../styles/Signup.module.css";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className={style.signupcontainer}>
      <div className={style.signupbox}>
        <h2>Sign Up</h2>
        <div className={style.inputcontainer}>
          <label htmlFor="name">Name</label>
          <div className={style.iconContainer}>
            {/* <HiOutlineUser className={style.icon} /> */}
          </div>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.inputcontainer}>
          <label htmlFor="email">Email</label>
          <div className={style.iconContainer}>
            {/* <HiOutlineMail className={style.icon} /> */}
          </div>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.inputcontainer}>
          <label htmlFor="password">Password</label>
          <div className={style.iconContainer}>
            {/* <HiOutlineLockClosed className={style.icon} /> */}
          </div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className={style.loginLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
