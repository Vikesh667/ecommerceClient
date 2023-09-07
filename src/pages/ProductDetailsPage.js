import React from "react";
import ProductDetail from "../features/products/component/ProductDetails";
import Navbar from "../features/Navbar"
const ProductDetailsPage = () => {
  return (
    <div>
        <Navbar/>
      <ProductDetail />
    </div>
  );
};

export default ProductDetailsPage;
