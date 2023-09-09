import React from 'react'
import Navbar from "../features/Navbar"
import UserOrders from '../features/user/componenet/UserOrders'
const UserOrderPage = () => {
  return (
    <>
        <Navbar/>
        <div style={{padding:"20px"}}>
            <h3 style={{textAlign:"center"}}>My Orders</h3>
        <UserOrders/>
        </div>
    </>
  )
}

export default UserOrderPage