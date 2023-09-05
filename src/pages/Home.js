import React from "react";
import { Product } from "../features/products/Products";
import Navbar from "../features/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Product />
    </div>
  );
};

export default Home;
