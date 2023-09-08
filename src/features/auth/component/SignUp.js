import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import style from "../../../styles/Signup.module.css";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../authSlice";

export function SignUp() {
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
     dispatch(createUserAsync({email:data.email,password:data.password}))
  };

  return (
    <div className={style.signupcontainer}>
      <form
        noValidate
        className={style.signupbox}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Sign Up</h2>
        <div className={style.inputcontainer}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && (
            <span className={style.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={style.inputcontainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required!", minLength: 6 })}
          />
          {errors.password && (
            <span className={style.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={style.inputcontainer}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: " Please confirm password!",
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.confirmPassword && (
            <span className={style.error}>{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className={style.loginLink}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
