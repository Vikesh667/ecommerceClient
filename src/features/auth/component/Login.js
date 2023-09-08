import React, { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import style from "../../../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hooks-useform";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const {register,handleSubmit,watch,formState:{errors}}=useForm()

  const handleLogin = () => {
    
  };

  return (
    <div className={style.logincontainer}>
      <div className={style.loginbox}>
        <h2>Login</h2>
        <div className={style.inputcontainer}>
          <label htmlFor="email">Email</label>
          <div className={style.iconContainer}>
            {/* <HiOutlineMail className={style.icon} /> */}
          </div>
          <input
            type="email"
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
