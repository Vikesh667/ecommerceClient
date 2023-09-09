import React, { useEffect } from 'react'
import style from "../styles/PageNotFound.module.css"
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import {selectLoggedInUser} from "../features/auth/authSlice"
import { resetOrder } from '../features/orders/orderSlice'
const OrderSuccessPage = () => {
   const params= useParams()
 const dispatch=useDispatch()
 const user=useSelector(selectLoggedInUser)
   useEffect(()=>{
    dispatch(resetCartAsync(user.id))
    dispatch(resetOrder())
   },[dispatch])
  return (
    <>{!params.id && <Navigate to='/' replace={true}></Navigate>}
    <div className={style.container}>
    <p className={style.errorcode}>Order Successfully Placed</p>
    <h1 className={style.title}>Order Number #{params?.id}</h1>
    <p className={style.message}>
      You can chech your order in my account
    </p>
    <div className={style.link}>
      <Link to="/">Go back home</Link>
    </div>
  </div>
  </>
  )
}

export default OrderSuccessPage