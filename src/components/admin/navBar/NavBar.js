import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./NavBar.module.scss";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const NavBar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaRegUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-product" className={activeLink}>
              View Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
