import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import style from "../../../styles/Login.module.css";
import { checkUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export  function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const user=useSelector(selectLoggedInUser)
  const handleLogin = (data) => {
    dispatch(checkUserAsync({email:data.email,password:data.password}))
  };

  return (
    <div className={style.logincontainer}>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div className={style.loginbox}>
        <h2>Login</h2>
        <form noValidate onSubmit={handleSubmit(handleLogin)}>
          <div className={style.inputcontainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className={style.error}>Email is required</span>
            )}
          </div>
          <div className={style.inputcontainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className={style.error}>Password is required</span>
            )}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
