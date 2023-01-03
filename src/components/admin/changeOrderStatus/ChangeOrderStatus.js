import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setstatus] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setisLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);

      setisLoading(false);
      toast.success("Order status changed successfully");

      navigate("/admin/orders");
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <div className={styles.card}>
            <h4>Update Status</h4>

            <form onSubmit={(e) => editOrder(e, id)}>
              <span>
                <select
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option value="" disabled>
                    --Choose One
                  </option>
                  <option value="Order Placed...">Order Placed...</option>
                  <option value="Processing...">Processing...</option>
                  <option value="Shipped...">Shipped...</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </span>

              <span>
                <button type="submit" className="--btn --btn-primary">
                  Update Status
                </button>
              </span>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
