import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CLEAR_CART } from "../../redux/slice/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  dispatch(CLEAR_CART());

  return (
    <section>
      <div className="container">
        <h2>Checkout Successful</h2>
        <p>Thank you for your purchase</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history">View Order Status</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
