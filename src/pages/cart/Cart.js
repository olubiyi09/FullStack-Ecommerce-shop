import React from "react";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import {
  ADD_TO_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>{cartItems.length === 0 ? "" : "Shopping Cart"}</h2>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.empty1}>
              <div className={styles.icon}>
                <AiOutlineShoppingCart size={60} color="orangered" />
              </div>
              <div className={styles.cartp}>Your cart is empty!</div>
              <p>Browse our categories and discover our best deals!</p>
              <br />

              <Link to="/#products">
                <button className="--btn">&larr; Go Back to Shop</button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} width={100} />
                      </td>
                      <td>${price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${price * cartQuantity.toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrash
                          size={18}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <div className={styles.flx}>
                <button className="--btn --btn-danger" onClick={clearCart}>
                  Clear Cart
                </button>

                <div>
                  <Link to="/#products"> &larr; Continue Shopping</Link>
                </div>
              </div>

              <div className={styles.checkout}>
                <Card>
                  <div className={styles.card}>
                    <p>
                      {" "}
                      {`Cart item(s):`} <b>{cartTotalQuantity}</b>
                    </p>
                    <div className={styles.text}>
                      <h4>Subtotal:</h4>
                      <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Check Out
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
