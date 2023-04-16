import React from "react";
import styles from "./FullCategories.module.scss";
import fashionImg from "../../assets/fashion.png";
import grocriesImg from "../../assets/grocries.png";
import phoneImg from "../../assets/phone.png";
import sneakersImg from "../../assets/sneakers.png";
import electronicsImg from "../../assets/electronics.png";
import laptopImg from "../../assets/laptop.png";
import healthImg from "../../assets/health&beauty.png";
import { Link, NavLink } from "react-router-dom";

// let id = "phone";
const FullCategories = () => {
  const handlePhoneClick = () => {
    // id = "phone";
  };
  return (
    <div className={`container ${styles["main-container"]}`}>
      <h3>Categories</h3>
      <div className={styles["main-wrapper"]}>
        <div
          className={styles.catImgWrapper}
          onClick={() => handlePhoneClick()}
        >
          <Link to="/category/Phone">
            <div className={styles.catImg}>
              <img src={phoneImg} alt="img..." />
            </div>
            <p>Phones</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Electronics">
            <div className={styles.catImg}>
              <img src={electronicsImg} alt="img..." />
            </div>
            <p>Electronics</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Laptop">
            <div className={styles.catImg}>
              <img src={laptopImg} alt="img..." />
            </div>
            <p>Laptops</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Fashion">
            <div className={styles.catImg}>
              <img src={fashionImg} alt="img..." />
            </div>
            <p>Fashion</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Grocries">
            <div className={styles.catImg}>
              <img src={grocriesImg} alt="img..." />
            </div>
            <p>Grocries</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Sneakers">
            <div className={styles.catImg}>
              <img src={sneakersImg} alt="img..." />
            </div>
            <p>Sneakers</p>
          </Link>
        </div>
        <div className={styles.catImgWrapper}>
          <Link to="/category/Health & Beauty">
            <div className={styles.catImg}>
              <img src={healthImg} alt="img..." />
            </div>{" "}
            <p>Beauty</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullCategories;
