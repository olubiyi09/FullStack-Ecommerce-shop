import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Home from "../../components/admin/home/Home";
import NavBar from "../../components/admin/navBar/NavBar";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";

import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-product" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
