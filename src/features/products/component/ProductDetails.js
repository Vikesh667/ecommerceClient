import React from "react";
import style from "../../../styles/ProductDetail.module.css";

const ProductDetail = () => {
  return (
    <div className={style.productDetailContainer}>
      <div className={style.productImage}>
        <img
          src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" 
          alt="Product Name"
        />
      </div>
      <div className={style.productInfo}>
        <h2 className={style.productName}>Product Name</h2>
        <p className={style.productDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          turpis vitae odio congue sagittis ac eu justo.
        </p>
        <div className={style.productPrice}>
          <span className={style.price}>$99.99</span>
          <button className={style.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
