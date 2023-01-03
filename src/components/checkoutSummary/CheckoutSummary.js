import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  // console.log(cartTotalAmount);
  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in the cart.</p>
            <button className="--btn">
              <Link to="/#products">Back to Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>

            <div className={styles.text}>
              <h4>Subtotal:</h4>
              <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;

              return (
                <Card key={id}>
                  <div className={styles.card}>
                    <h4>Product: {name}</h4>
                    <p>Quantity: {cartQuantity}</p>
                    <p>Unit price: {price}</p>
                    <p>Set price: {price * cartQuantity}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
