import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import style from "../../../styles/UserOrders.module.css";
import { Link } from "react-router-dom";
const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);
  return (
    <div>
      {orders.map((order) => (
        <div>
          <div className={style.cartcontainer}>
            <h2>Order#{order.id}</h2>
            <h4>Order status:{order.status}</h4>
            <div className={style.cartitems}>
              {order.items.map((item) => (
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
                    </div>
                  </div>
                  <div className={style.remove}>
                    <p>${item.price}</p>
                  </div>
                  <hr />
                  <div className={style.total}>
                    <div>
                      <h4>Subtotal</h4>
                      <h4>Totals item in Cart</h4>
                    </div>
                    <span>
                      <p>${order.totalAmount}</p>
                      <p>{order.totalItems} items</p>
                    </span>
                  </div>
                  <div className={style.shipingAddress}>
                  <p>Shiping Address:</p>
                  <li className={style.addressContainer}>
                    <div className={style.vikesh}>
                      <p>{order.selectedAddress.name}</p>
                      <p>{order.selectedAddress.street}</p>
                      <p>{order.selectedAddress.city}</p>
                    </div>
                    <div>
                      <p>Phone:{order.selectedAddress.phone}</p>
                      <p>{order.selectedAddress.pinCode}</p>
                    </div>
                  </li>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
