import React from "react";
import { useEffect } from "react";
// import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";
import FullCategories from "../fullCategories/FullCategories";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProduct = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProduct();
  }, [url]);
  return (
    <div>
      <Slider />
      <FullCategories />
      <Product />
    </div>
  );
};

export default Home;
