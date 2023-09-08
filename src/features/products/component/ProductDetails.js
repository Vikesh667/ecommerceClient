import React, { useEffect, useState } from "react";
import style from "../../../styles/ProductDetail.module.css"; // Import the CSS Module
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectedProductById } from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const product = useSelector(selectedProductById);
  const params = useParams();
  const dispatch = useDispatch();
  const user=useSelector(selectLoggedInUser)

  const handleCart=(e)=>{
    e.preventDefault()
     dispatch(addToCartAsync({...product,quantity:1,user:user.id}))
  }
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

 
  return (
    <div className={style.container}>
      {product ? (
        <div className={style.productinfo}>
          <div className={style.imageSlider}>
            <button className={style.sliderButton} onClick={prevImage}>
              {"<"}
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className={style.productImage}
            />
            <button className={style.sliderButton} onClick={nextImage}>
              {">"}
            </button>
          </div>

          <h2 className={style.productTitle}>{product.title}</h2>
          <p className={style.productDescription}>{product.description}</p>
          <div className={style.productDetails}>
            <p className={style.productPrice}>Price: ${product.price}</p>
            <p className={style.productDiscount}>
              Discount: {product.discountPercentage}%
            </p>
            <p className={style.productRating}>Rating: {product.rating}</p>
            <p className={style.productStock}>
              In Stock: {product.stock} units
            </p>
            <p className={style.productBrand}>Brand: {product.brand}</p>
            <p className={style.productCategory}>
              Category: {product.category}
            </p>
          </div>
          <div className={style.addToCart}>
            <button className={style.cartButton} 
             onClick={handleCart}
            >Add to Cart
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
