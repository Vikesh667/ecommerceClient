import React from "react";

import Navbar from "../features/Navbar";
import { Product } from "../features/products/component/Products";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Product />
    </div>
  );
};

export default Home;
