import React, { useState } from "react";
import style from "../../../styles/ProductDetail.module.css"; // Import the CSS Module

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const product = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
  ];

  return (
    <div className={style.container}>
      {product.map((image, index) => (
        <div className={style.productContent}>
          <div key={index} className={style.images}>
            {image.images.map((imgr, imgIndex) => (
              <img
                key={imgIndex}
                src={imgr}
                alt={image.title}
                className={imgIndex === currentImageIndex ? style.active : ""}
                onClick={() => handleImageChange(imgIndex)}
              />
            ))}
          </div>
          <div className={style.productinfo}>
            <h2>{image.title}</h2>
            <p>{image.description}</p>
            <p>Price: ${image.price}</p>
            <p>Discount: {image.discountPercentage}%</p>
            <p>Rating: {image.rating}</p>
            <p>In Stock: {image.stock} units</p>
            <p>Brand: {image.brand}</p>
            <p>Category: {image.category}</p>
            <div className={style.addToCart}>
              <button> Add To Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
